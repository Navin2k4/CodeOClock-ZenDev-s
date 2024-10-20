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
  const [irrigationAdvice, setIrrigationAdvice] = useState("");
  const [adviceLoading, setAdviceLoading] = useState(false); // Loading state for irrigation advice

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`/api/weather/getData/${location}`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeatherData(data);
        await generateIrrigationAdvice(data); // Call to generate irrigation advice
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const generateIrrigationAdvice = async (data) => {
    setAdviceLoading(true); // Start loading for irrigation advice
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBKVZcmmQ_UtLrEYS1UpDaSPi7pDCfjQns" // Use a valid key here
    );
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

    // Construct the daily temperature and rainfall data for the prompt
    const dailyTemperatures = data.list
      .map((item) => {
        const minTemp = (item.main.temp_min - 273.15).toFixed(2);
        const maxTemp = (item.main.temp_max - 273.15).toFixed(2);
        return `${
          new Date(item.dt_txt).toISOString().split("T")[0]
        }: Min ${minTemp}°C, Max ${maxTemp}°C`;
      })
      .join("\n");

    const dailyRainfall = data.list
      .map((item) => {
        const rainfall = item.rain ? item.rain["3h"] : 0;
        return `${
          new Date(item.dt_txt).toISOString().split("T")[0]
        }: ${rainfall} mm`;
      })
      .join("\n");

    const prompt = `
        Based on the following conditions:
        - Location: ${location}
        - Crop Type: ${cropType}
        - Soil Type: ${soilType}
        - Average Humidity: ${avgHumidity.toFixed(2)}%
        - Daily Humidity: ${data.list
          .map((item) => item.main.humidity)
          .join(", ")}%
        - Temperature Range: ${(avgTemp - 273.15).toFixed(2)}°C to ${(
      avgTemp -
      273.15 +
      10
    ).toFixed(2)}°C
        - Daily Temperatures: 
          ${dailyTemperatures}
        - Total Expected Rainfall: ${totalRainfall.toFixed(2)} mm
        - Daily Rainfall: 
          ${dailyRainfall}
        - Current Soil Moisture: 30%
        - Crop Stage: flowering
        - Irrigation System: drip
        
        Provide tailored irrigation advice for the upcoming week give me the weekly . 
        avoid tabels
        `;

    try {
      const result = await model.generateContent(prompt);
      console.log(result.response.text());

      setIrrigationAdvice(result.response.text());
    } catch (error) {
      console.error("Error generating irrigation advice:", error);
      setIrrigationAdvice("Could not generate irrigation advice at this time.");
    } finally {
      setAdviceLoading(false); // Stop loading for irrigation advice
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
    humidity: item.main.humidity,
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
      chartData.length || 0;

      const formatIrrigationAdvice = (rawAdvice) => {
        const lines = rawAdvice.split("\n").filter((line) => line.trim() !== "");
        const formattedAdvice = [];
      
        lines.forEach((line, index) => {
          line = line.trim(); // Remove leading and trailing whitespace
      
          // Handle headings (h1 to h6)
          if (line.startsWith("# ")) {
            formattedAdvice.push(
              <h1 key={index} className="text-3xl font-bold mt-4">{line.replace("# ", "")}</h1>
            );
          } else if (line.startsWith("## ")) {
            formattedAdvice.push(
              <h2 key={index} className="text-2xl font-bold mt-4">{line.replace("## ", "")}</h2>
            );
          } else if (line.startsWith("### ")) {
            formattedAdvice.push(
              <h3 key={index} className="text-xl font-bold mt-4">{line.replace("### ", "")}</h3>
            );
          } else if (line.startsWith("#### ")) {
            formattedAdvice.push(
              <h4 key={index} className="text-lg font-bold mt-4">{line.replace("#### ", "")}</h4>
            );
          } else if (line.startsWith("##### ")) {
            formattedAdvice.push(
              <h5 key={index} className="text-base font-bold mt-4">{line.replace("##### ", "")}</h5>
            );
          } else if (line.startsWith("###### ")) {
            formattedAdvice.push(
              <h6 key={index} className="text-sm font-bold mt-4">{line.replace("###### ", "")}</h6>
            );
          } 
          // Handle bullet points and numbered lists with formatting
          else if (line.startsWith("* ") || line.startsWith("- ") || line.startsWith("1. ")) {
            // Determine if the line is a list item
            const isBullet = line.startsWith("* ") || line.startsWith("- ");
            const isNumbered = line.startsWith("1. ");
      
            // Remove the bullet/numbering and trim
            const content = line.replace(/^(\* |- |1\. )/, "").trim();
      
            // Split to handle bold and italic within the item
            const parts = content.split(/(\*\*.*?\*\*|\*.*?\*|__.*?__|_.*?_)/g); 
      
            const formattedListItem = parts.map((part, partIndex) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={partIndex}>{part.slice(2, -2)}</strong>; // Bold text
              } else if (part.startsWith("*") && part.endsWith("*")) {
                return <em key={partIndex}>{part.slice(1, -1)}</em>; // Italic text
              } else if (part.startsWith("__") && part.endsWith("__")) {
                return <strong key={partIndex} className="underline">{part.slice(2, -2)}</strong>; // Underlined bold text
              } else if (part.startsWith("_") && part.endsWith("_")) {
                return <em key={partIndex}>{part.slice(1, -1)}</em>; // Underlined italic text
              }
              return part; // Plain text
            });
      
            formattedAdvice.push(
              <li key={index} className="ml-5 list-disc">
                {formattedListItem}
              </li>
            );
          } else {
            // Handle inline bold and italic for regular lines
            const parts = line.split(/(\*\*.*?\*\*|\*.*?\*|__.*?__|_.*?_)/g); 
            const formattedLine = parts.map((part, partIndex) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={partIndex}>{part.slice(2, -2)}</strong>; // Bold text
              } else if (part.startsWith("*") && part.endsWith("*")) {
                return <em key={partIndex}>{part.slice(1, -1)}</em>; // Italic text
              } else if (part.startsWith("__") && part.endsWith("__")) {
                return <strong key={partIndex} className="underline">{part.slice(2, -2)}</strong>; // Underlined bold text
              } else if (part.startsWith("_") && part.endsWith("_")) {
                return <em key={partIndex}>{part.slice(1, -1)}</em>; // Underlined italic text
              }
              return part; // Plain text
            });
      
            formattedAdvice.push(
              <p key={index} className="mt-2">{formattedLine}</p>
            );
          }
        });
      
        return <div>{formattedAdvice}</div>;
      };
      

  return (
    <div className="min-h-screen px-4">
      <div className="min-h-screen pb-8 px-4">


  {/* Irrigation Recommendation */}
  <div className="bg-gray-100 rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-2xl font-bold text-center mb-4">
      Irrigation Recommendation
    </h2>
    {adviceLoading ? (
      <p className="text-lg text-center italic">Generating irrigation advice...</p>
    ) : (
      <div className="text-lg text-left">
        <p className="mb-2">
          Based on the weather analysis for the week, the recommendation is:
        </p>
        <div className="border-l-4 border-blue-500 pl-4">
          {formatIrrigationAdvice(irrigationAdvice)}
        </div>
      </div>
    )}
  </div>
</div>

  {/* Weekly Weather Statistics */}
  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <h2 className="text-3xl font-bold mb-4 text-center capitalize">
      Weekly Weather Statistics - {location}
    </h2>
    <div className="space-y-2">
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
