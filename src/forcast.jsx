import { useEffect, useState } from "react";
import ForecastChart from "./ForecastChart";
import "./HourlyForecast.css";

export default function HourlyForecast({ lat, lon }) {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "935f330dfabb9e61f0b34fc85e5b2ca8";

  useEffect(() => {
    async function fetchForecast() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        const data = await res.json();

        console.log(data);

        if (res.ok && data.list) {
          setForecastData(data.list.slice(0, 8));
        } else {
          console.error("Forecast fetch failed", data);
        }
      } catch (err) {
        console.error("Error fetching forecast:", err);
      } finally {
        setLoading(false);
      }
    }

    if (lat && lon) {
      fetchForecast();
    }
  }, [lat, lon]);

  if (loading) return <p className="text-center py-3">🔄 Loading forecast...</p>;
  if (!forecastData.length) return <p className="text-center py-3">⚠️ No forecast data available.</p>;

  return (
    <div className="forecast-container shadow-sm rounded p-3 bg-white mb-4">
      <h5 className="mb-3 text-center heading text-primary fw-bold">
        🌤️ Hourly Forecast (Next 24 Hours)
      </h5>
      <ForecastChart data={forecastData} />
    </div>
  );
}
