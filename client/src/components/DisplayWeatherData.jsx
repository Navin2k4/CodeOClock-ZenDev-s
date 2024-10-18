import React, { useState, useEffect } from "react";

const DisplayWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("/api/weather/getData");
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Weather Forecast for {weatherData.city?.name}
      </h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {weatherData.list?.map((item, index) => (
          <div
            key={index}
            className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-4 transform hover:scale-105 transition-transform duration-200"
          >
            <div className="text-xl font-semibold text-gray-900">
              {new Date(item.dt_txt).toLocaleString("en-US", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </div>
            <p className="text-gray-500">
              <strong>Temperature:</strong>{" "}
              {(item.main.temp - 273.15).toFixed(2)} °C
            </p>
            <p className="text-gray-500">
              <strong>Weather:</strong> {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayWeatherData;
