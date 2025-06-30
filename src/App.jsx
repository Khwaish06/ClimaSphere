import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar.jsx";
import InfoBox from "./infoBox.jsx";
import Details from "./details.jsx";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <BrowserRouter>
      <Navbar setResult={setWeatherData} />
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="main-content text-center d-flex flex-column align-items-center"
              style={{
                padding: "2rem 1rem",
                minHeight: "80vh",
                background: "linear-gradient(to bottom, #e6f2ff, #ffffff)",
              }}
            >
              {/* Show welcome section ONLY if no weatherData */}
              {!weatherData && (
                <div className="welcome-section mb-4">
                  <h2 className="text-primary">
                    Welcome to <span className="pacifico-regular"><u>ClimaSphere</u> <i className="fa-solid fa-cloud"></i></span>
                  </h2>
                  <p className="text-muted" style={{ maxWidth: "600px" }}>
                    Get real-time weather updates, air quality info, and smart suggestions based on the city you search above.
                  </p>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1163/1163624.png"
                    alt="Weather icon"
                    style={{ width: "130px", marginTop: "15px", opacity: 0.9 }}
                  />
                </div>
              )}

              {/* Show InfoBox only when weather is available */}
              {weatherData && (
                <div className="mt-3">
                  <InfoBox info={weatherData} />
                </div>
              )}
            </div>
          }
        />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}
