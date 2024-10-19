import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure this package is installed

const DisplayWeatherData = (formData) => {
  const { location, cropType, soilType, growthStage } = formData.data;

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [irrigationAdvice, setIrrigationAdvice] = useState(""); // State for irrigation advice

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather/getData/${location}`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
        await generateIrrigationAdvice(data); // Call to generate irrigation advice
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const generateIrrigationAdvice = async (data) => {
    const cropType = "wheat"; // Crop type
    const soilType = "loamy"; // Soil type
    const location = "Madurai"; // Location
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBKVZcmmQ_UtLrEYS1UpDaSPi7pDCfjQns"
    ); // Use a valid key here
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const avgHumidity =
      data.list.reduce((acc, curr) => acc + curr.main.humidity, 0) /
        data.list.length || 0;
    const totalRainfall =
      data.list.reduce(
        (acc, curr) => acc + (curr.rain ? curr.rain["3h"] : 0),
        0
      ) || 0;

    const avgTemp =
      data.list.reduce((acc, curr) => acc + curr.main.temp, 0) /
        data.list.length || 0;
    const prompt = `
        Based on the following conditions:
        - Location: Madurai
        - Crop Type: wheat
        - Soil Type: loamy
        - Average Humidity: 77.67%
        - Daily Humidity: 75%, 78%, 80%, 79%, 76%, 74%, 73%
        - Temperature Range: 22°C to 32°C
        - Daily Temperatures: 
          - 2024-10-20: Min 22°C, Max 30°C
          - 2024-10-21: Min 23°C, Max 31°C
          - 2024-10-22: Min 21°C, Max 29°C
          - 2024-10-23: Min 22°C, Max 32°C
          - 2024-10-24: Min 24°C, Max 30°C
          - 2024-10-25: Min 22°C, Max 31°C
          - 2024-10-26: Min 23°C, Max 32°C
        - Total Expected Rainfall: 25 mm
        - Daily Rainfall: 
          - 2024-10-20: 5 mm
          - 2024-10-21: 10 mm
          - 2024-10-22: 0 mm
          - 2024-10-23: 0 mm
          - 2024-10-24: 5 mm
          - 2024-10-25: 5 mm
          - 2024-10-26: 0 mm
        - Current Soil Moisture: 30%
        - Crop Stage: flowering
        - Irrigation System: drip
        
        Provide tailored irrigation advice for the upcoming week give me simple as possible. 
        `;

    try {
      const result = await model.generateContent(prompt);
      setIrrigationAdvice(formatIrrigationAdvice(result.response.text())); // Format the advice here
    } catch (error) {
      console.error("Error generating irrigation advice:", error);
      setIrrigationAdvice("Could not generate irrigation advice at this time.");
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  // Prepare data for charts
  const days = weatherData.list;
  const chartData = days.map((item) => ({
    date: new Date(item.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    minTemp: (item.main.temp_min - 273.15).toFixed(2),
    maxTemp: (item.main.temp_max - 273.15).toFixed(2),
    rainfall: item.rain ? item.rain["3h"] : 0,
    humidity: item.main.humidity, // Ensure humidity is included
  }));

  // Calculate total statistics for the week
  const totalRainfall = chartData.reduce(
    (acc, curr) => acc + parseFloat(curr.rainfall),
    0
  );
  const avgMinTemp = (
    chartData.reduce((acc, curr) => acc + parseFloat(curr.minTemp), 0) /
    chartData.length
  ).toFixed(2);
  const avgMaxTemp = (
    chartData.reduce((acc, curr) => acc + parseFloat(curr.maxTemp), 0) /
    chartData.length
  ).toFixed(2);
  const avgHumidity =
    chartData.reduce((acc, curr) => acc + curr.humidity, 0) /
      chartData.length || 0; // Handle NaN
  const formatIrrigationAdvice = (rawAdvice) => {
    // Split the advice into lines and initialize an array for formatted advice
    const lines = rawAdvice.split("\n").filter((line) => line.trim() !== "");
    const formattedAdvice = [];

    // Loop through each line and apply formatting based on your specifications
    lines.forEach((line) => {
      if (line.startsWith("##")) {
        // If the line starts with ##, treat it as a header
        formattedAdvice.push(
          <h3 key={line} className="text-xl font-bold mt-4">
            {line.replace("## ", "")}
          </h3>
        );
      } else if (line.startsWith("*")) {
        // If the line starts with *, treat it as a bullet point
        formattedAdvice.push(
          <li key={line} className="ml-5 list-disc">
            {line.replace("* ", "")}
          </li>
        );
      } else {
        // Otherwise, treat it as regular text
        formattedAdvice.push(
          <p key={line} className="mt-2">
            {line}
          </p>
        );
      }
    });

    return formattedAdvice;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Weekly Weather Statistics
        </h2>
        <p className="text-lg">
          <strong>Average Minimum Temperature:</strong> {avgMinTemp} °C
        </p>
        <p className="text-lg">
          <strong>Average Maximum Temperature:</strong> {avgMaxTemp} °C
        </p>
        <p className="text-lg">
          <strong>Total Rainfall:</strong> {totalRainfall.toFixed(2)} mm
        </p>
        <p className="text-lg">
          <strong>Average Humidity:</strong> {avgHumidity.toFixed(2)} %
        </p>
      </div>

      {/* Irrigation Recommendation */}
      <div className="bg-blue-100 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Irrigation Recommendation
        </h2>
        <p className="text-lg text-left">
          Based on the weather analysis for the week, the recommendation is:{" "}
          <strong>{irrigationAdvice}</strong>
        </p>
      </div>

      {/* Temperature Trend Chart */}
      <div className="m-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Temperature Trend (Min/Max)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="minTemp" stroke="#8884d8" />
            <Line type="monotone" dataKey="maxTemp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rainfall Trend Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Rainfall Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rainfall" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Weather Statistics (Horizontal Scroll) */}
      <div className="relative ">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full z-10"
          onClick={() => (document.getElementById("slider").scrollLeft -= 300)}
        >
          {"<"}
        </button>

        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full z-10"
          onClick={() => (document.getElementById("slider").scrollLeft += 300)}
        >
          {">"}
        </button>

        <div id="slider" className="overflow-x-auto scroll-smooth">
          <div className="flex gap-6">
            {days.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 min-w-[250px] transform hover:scale-105 transition-transform duration-200"
              >
                <div className="text-lg font-semibold text-gray-900">
                  {new Date(item.dt_txt).toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  })}
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                  {/* Temperature */}
                  <div className="bg-blue-100 p-2 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Temperature</p>
                    <p className="text-lg font-bold">
                      {(item.main.temp - 273.15).toFixed(2)} °C
                    </p>
                    <div className="text-xs text-gray-600">
                      Min: {(item.main.temp_min - 273.15).toFixed(2)} °C | Max:{" "}
                      {(item.main.temp_max - 273.15).toFixed(2)} °C
                    </div>
                  </div>

                  {/* Rainfall */}
                  <div className="bg-blue-100 p-2 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Rainfall</p>
                    <p className="text-lg font-bold">
                      {item.rain ? `${item.rain["3h"]} mm` : "0 mm"}
                    </p>
                  </div>

                  {/* Humidity */}
                  <div className="bg-yellow-100 p-2 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="text-lg font-bold">{item.main.humidity} %</p>
                  </div>

                  {/* Wind Speed */}
                  <div className="bg-green-100 p-2 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="text-lg font-bold">{item.wind.speed} m/s</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayWeatherData;
