// Either use this (arrow function with const):
const AlertBanner = ({ temp, weather, aqi }) => {
  const alerts = [];

  // Check conditions
  if (temp > 35) alerts.push({ 
    text: "⚠️ Extreme Heat Warning: Stay hydrated!", 
    color: "#FF6B6B" 
  });
  if (weather.toLowerCase().includes("rain") && temp < 5) alerts.push({ 
    text: "⚠️ Freezing Rain Alert: Icy roads possible!", 
    color: "#3498DB" 
  });
  if (aqi >= 4) alerts.push({ 
    text: "⚠️ Poor Air Quality: Limit outdoor activities!", 
    color: "#8E44AD" 
  });

  // Show only the highest priority alert (or first one)
  const activeAlert = alerts[0];

  if (!activeAlert){
    return null;}

  return (
    <div 
      className="p-3 mb-4 text-center text-white rounded shadow" 
      style={{ 
        backgroundColor: activeAlert.color,
        animation: "pulse 2s infinite"
      }}
    >
      <strong>{activeAlert.text}</strong>
    </div>
  );
};

export default AlertBanner;