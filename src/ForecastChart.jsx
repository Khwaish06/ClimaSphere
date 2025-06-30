import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function ForecastChart({ data }) {
  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const formattedData = data.map((item) => ({
    time: formatTime(item.dt),
    temp: item.main.temp,
    humidity: item.main.humidity,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 12 }}
          stroke="#333"
        />
        <YAxis
          yAxisId="left"
          orientation="left"
          tickFormatter={(v) => `${v}°`}
          stroke="#ff7300"
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(v) => `${v}%`}
          stroke="#007bff"
        />
        <Tooltip
          contentStyle={{ backgroundColor: "#f8f9fa", borderRadius: "8px" }}
          labelStyle={{ fontWeight: "bold" }}
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temp"
          stroke="#ff7300"
          name="Temp (°C)"
          strokeWidth={2.5}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="#007bff"
          name="Humidity (%)"
          strokeDasharray="5 5"
          strokeWidth={2.5}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}