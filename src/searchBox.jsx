import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./App.css";

export default function SearchBox({ setResult }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
  const AQI_API = "https://api.openweathermap.org/data/2.5/air_pollution";
  const ONECALL_API = "https://api.openweathermap.org/data/2.5/onecall";
  const API_KEY = "935f330dfabb9e61f0b34fc85e5b2ca8";

  const getWeatherInfo = async (cityInput) => {
    try {
      const response = await fetch(
        `${WEATHER_API}?q=${cityInput}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (!response.ok || data.cod === "404") {
        setError("City not found. Please enter a valid city.");
        setResult(null);
        return;
      }

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      // Fetch AQI
      const aqiResponse = await fetch(`${AQI_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const aqiData = await aqiResponse.json();
      const aqi = aqiData.list[0].main.aqi;
      console.log(`aqi is this ${aqi}`);
      // Fetch OneCall for UV Index
      const onecallResponse = await fetch(`${ONECALL_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
      const onecallData = await onecallResponse.json();
      const result = {
        city: cityInput,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        humidity: data.main.humidity,
        feelslike: data.main.feels_like,
        weather: data.weather[0].description,
        lat,
        lon,
        aqi,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
      };

      setResult(result);
      setError(null);
      setCity("");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
      setResult(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim() !== "") {
      getWeatherInfo(city.trim());
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const spokenCity = event.results[0][0].transcript;
      setCity(spokenCity);
      getWeatherInfo(spokenCity);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setError("Couldn't recognize voice input.");
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center">
      <TextField
        id="city"
        label="City Name"
        variant="outlined"
        required
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{
          borderRadius: "25px",
          backgroundColor: "#f5f5f5",
          marginRight: "10px",
          width: "250px"
        }}
        InputProps={{
          style: { borderRadius: "25px" }
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          borderRadius: "25px",
          padding: "8px 20px",
          backgroundColor: "#0d6efd",
          textTransform: "capitalize",
          marginRight: "8px"
        }}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        onClick={handleMicClick}
        sx={{
          borderRadius: "50%",
          padding: "8px",
          minWidth: "40px"
        }}
      >
        <i className="fa-solid fa-microphone"></i>
      </Button>
      {error && <p className="error-message mt-2 text-danger">{error}</p>}
    </form>
  );
}
