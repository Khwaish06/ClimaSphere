import { useState } from "react";
import "./weather.css";

export default function WeatherSongs({ temp, weather }) {
  const [selectedUrl, setSelectedUrl] = useState(null);

  let songs = [];

  if (weather.toLowerCase().includes("rain")) {
    songs = [
      { title: "Rainy Mood", url: "https://www.youtube.com/embed/hmDxnY2Xez8" },
      { title: "Raindrops Keep Falling", url: "https://www.youtube.com/embed/stnLZAVn5wM" },
    ];
  } else if (temp > 30) {
    songs = [
      { title: "Summer of '69", url: "https://www.youtube.com/embed/eFjjO_lhf9c" },
      { title: "Heat Waves", url: "https://www.youtube.com/embed/mRD0-GxqHVo" },
    ];
  } else if (temp < 15) {
    songs = [
      { title: "Let It Go", url: "https://www.youtube.com/embed/L0MK7qz13bU" },
      { title: "The Scientist – Coldplay", url: "https://www.youtube.com/embed/RB-RcX5DS5A" },
    ];
  } else {
    songs = [
      { title: "Sunroof", url: "https://www.youtube.com/embed/K4DyBUG242c" },
      { title: "Happy – Pharrell Williams", url: "https://www.youtube.com/embed/ZbZSe6N_BXs" },
    ];
  }

  return (
    <div className="card p-4 mb-4 weatherSong">
      <h5 className="mb-3 heading">
        <i className="fa-solid fa-music"></i> Weather-based Song Suggestions
      </h5>

      {songs.map((song, index) => (
        <div key={index} className="song-row">
          <span className="innerContainer">{song.title}</span>
          <button
            className="btn btn-outline-primary"
            onClick={() => setSelectedUrl(song.url)}
            type="button"
          >
            <i className="fa-solid fa-play me-1"></i>Play
          </button>
        </div>
      ))}

      {selectedUrl && (
        <div className="ratio ratio-16x9 mt-3">
          <iframe
            src={selectedUrl}
            title="Weather Song Player"
            allow="autoplay"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
