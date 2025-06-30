import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import "./details.css";
import HourlyForecast from "./forcast.jsx";
import WeatherSongs from "./weatherSongs.jsx";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import axios from "axios";
import AlertBanner from "./alerts.jsx";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const info = location.state?.info;

  const [userPrompt, setUserPrompt] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [loading, setLoading] = useState(false);

  if (!info) {
    return <p className="text-center mt-5">No weather data available. Please go back and search again.</p>;
  }

  const HOT_URL = "https://healthytalbot.org/wp-content/uploads/2019/07/extremeheat_456px.jpg";
  const COLD_URL = "https://www.shutterstock.com/image-photo/cityscape-during-heavy-snowfall-streets-600nw-2563168557.jpg";
  const RAIN_URL = "https://cdn.girls.buzz/images/girls.buzz.max-1440x900.webp";
  const DEFAULT_URL = "https://images.unsplash.com/photo-1501973801540-537f08ccae7b";

  let weatherImage = DEFAULT_URL;
  if (info.weather.toLowerCase().includes("rain")) weatherImage = RAIN_URL;
  else if (info.temp > 25) weatherImage = HOT_URL;
  else if (info.temp < 15) weatherImage = COLD_URL;

  const getClothingSuggestion = (temp, weather) => {
    let suggestion = "";
    if (temp > 30) suggestion += "Wear light cotton clothes. Use sunscreen and sunglasses. ";
    else if (temp >= 15 && temp <= 30) suggestion += "Wear comfortable clothes like a t-shirt and jeans. ";
    else suggestion += "Wear warm clothes like a hoodie or jacket. ";
    if (weather.toLowerCase().includes("rain")) suggestion += "Carry an umbrella or raincoat.";
    return suggestion;
  };

  const getAQIDescription = (aqi) => {
    switch (aqi) {
      case 1: return "Good – Air quality is satisfactory and poses little or no risk.";
      case 2: return "Fair – Air quality is acceptable; however, there may be concern for some pollutants.";
      case 3: return "Moderate – Unhealthy for sensitive groups.";
      case 4: return "Poor – Unhealthy. Everyone may begin to experience health effects.";
      case 5: return "Very Poor – Very unhealthy and may pose serious health risks.";
      default: return "Unknown AQI level.";
    }
  };

  const getAQIColor = (aqi) => {
    switch (aqi) {
      case 1: return "#2ECC71";
      case 2: return "#F1C40F";
      case 3: return "#E67E22";
      case 4: return "#E74C3C";
      case 5: return "#8E44AD";
      default: return "#7f8c8d";
    }
  };

  const handleAskAI = async (e) => {
  e.preventDefault();
  if (!userPrompt.trim()) return;
  setLoading(true);
  setBotResponse("");

  try {
    const response = await axios.post(`${baseURL}/api/chat`, {
      prompt: `${userPrompt}. Weather info: City=${info.city}, Temp=${info.temp}, Weather=${info.weather}`
    });
    setBotResponse(response.data.message);
  } catch (err) {
    console.error("OpenRouter Proxy API error:", err);
    setBotResponse("⚠️ Sorry, something went wrong.");
  }

  setLoading(false);
};

  return (
    <div className="container-fluid px-4 details-layout">
      <div className="row">
        {/* Left Panel */}
        <div className="col-lg-6">
          <HourlyForecast lat={info.lat} lon={info.lon} />
          <WeatherSongs temp={info.temp} weather={info.weather} />
          <AlertBanner temp={info.temp}  weather={info.weather} aqi={info.aqi} />

          <div className="map-container rounded shadow-sm mt-4 overflow-hidden" style={{ height: "300px" }}>
            <MapContainer center={[info.lat, info.lon]} zoom={6} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=935f330dfabb9e61f0b34fc85e5b2ca8`}
                opacity={0.5}
              />
            </MapContainer>
          </div>

          <div className="card shadow-sm mt-4 p-3">
            <h5 className="card-title">🤖 Ask ClimaBot</h5>
            <form onSubmit={handleAskAI}>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ask anything like 'What should I wear?'"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                />
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Thinking..." : "Ask"}
                </button>
              </div>
            </form>
            {botResponse && (
              <div className="bg-light rounded p-3 mt-2">
                <strong>🤖 ClimaBot says:</strong>
                <p className="mt-1 mb-0">{botResponse}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="col-lg-6">
          <div className="card shadow mb-4">
            <img src={weatherImage} className="card-img-top" alt="Weather" />
            <div className="card-body">
              <h4 className="card-title fw-bold text-primary mb-3">{info.city}</h4>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">🌥️ <strong>Weather:</strong> {info.weather}</li>
                <li className="list-group-item">🌡️ <strong>Temperature:</strong> {info.temp}°C</li>
                <li className="list-group-item">{info.feelslike > info.temp + 2 ? "🔥" : info.feelslike < info.temp - 2 ? "❄️" : "🤗"} <strong>Feels Like:</strong> {info.feelslike}°C</li>
                <li className="list-group-item"><i className="fa-solid fa-droplet"></i> <strong>Humidity:</strong> {info.humidity}%</li>
                <li className="list-group-item">📉 <strong>Min Temp:</strong> {info.tempMin}°C</li>
                <li className="list-group-item">📈 <strong>Max Temp:</strong> {info.tempMax}°C</li>
                <li className="list-group-item"><i className="fa-solid fa-wind"></i> <strong>Wind Speed:</strong> {info.windSpeed} m/s</li>
                <li className="list-group-item"><i className="fa-solid fa-eye"></i> <strong>Visibility:</strong> {info.visibility} m</li>
              </ul>
              <div className="mt-3"><strong>👕 Clothing Suggestion:</strong> {getClothingSuggestion(info.temp, info.weather)}</div>
            </div>
          </div>

          <div className="card shadow-sm mb-4" style={{ borderLeft: `10px solid ${getAQIColor(info.aqi)}`, backgroundColor: "#fdfdfd" }}>
            <div className="card-body">
              <h5 className="card-title mb-3 d-flex align-items-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/727/727790.png"
                  alt="AQI Icon"
                  width="24"
                  height="24"
                  style={{ marginRight: "10px" }}
                />
                Air Quality Index (AQI)
              </h5>
              <p className="mb-1"><strong>Level:</strong> {info.aqi}</p>
              <p className="mb-0"><strong>Impact:</strong> {getAQIDescription(info.aqi)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
