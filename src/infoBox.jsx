import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function InfoBox({ info }) {
  const navigate = useNavigate();

  useEffect(() => {
    const speakWeather = () => {
      const message = new SpeechSynthesisUtterance(
        `The weather in ${info.city} is ${info.weather} with a temperature of ${info.temp} degrees Celsius. Click the card to view more details.`
      );

      message.lang = "en-US";
      message.rate = 1;
      message.pitch = 1;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(message);
    };

    if (!info) return;
    console.log(info);

    if ("speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          console.log("✅ Voices loaded");
          speakWeather();
        };
      } else {
        setTimeout(speakWeather, 300);
      }
    } else {
      console.warn("❌ Speech synthesis not supported.");
    }
  }, [info]);

  if (!info) return null;

  const HOT_URL = "https://healthytalbot.org/wp-content/uploads/2019/07/extremeheat_456px.jpg";
  const COLD_URL = "https://www.shutterstock.com/image-photo/cityscape-during-heavy-snowfall-streets-600nw-2563168557.jpg";
  const RAIN_URL = "https://cdn.girls.buzz/images/girls.buzz.max-1440x900.webp";
  const DEFAULT_URL = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b";

  let weatherImage = DEFAULT_URL;
  if (info.weather.toLowerCase().includes("rain")) weatherImage = RAIN_URL;
  else if (info.temp > 25) weatherImage = HOT_URL;
  else if (info.temp < 15) weatherImage = COLD_URL;

  const handleCardClick = () => {
    navigate("/details", { state: { info } });
  };

  return (
    <div className="info-box-container d-flex justify-content-center py-4">
      <div
        className="card shadow-lg rounded-4 border-0"
        style={{ width: "22rem", cursor: "pointer", overflow: "hidden" }}
        onClick={handleCardClick}
      >
        <img src={weatherImage} className="card-img-top" alt="Weather" style={{ height: "200px", objectFit: "cover" }} />
        <div className="card-body text-center">
          <h5 className="card-title text-primary fw-bold mb-2">{info.city}</h5>
          <p className="card-text mb-1"><strong>🌡️ Temp:</strong> {info.temp}°C</p>
          <p className="card-text mb-1"><strong>🌥️ Weather:</strong> {info.weather}</p>
          <p className="text-muted small">Click card to view more →</p>
        </div>
      </div>
    </div>
  );
}
