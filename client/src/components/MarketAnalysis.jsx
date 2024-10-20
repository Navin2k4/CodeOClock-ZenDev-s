import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const dummyData = [
  { location: "PB", cropName: "Wheat", cropType: "Durum", marketValue: 180, predictedYield: 350 },
  { location: "MP", cropName: "Barley", cropType: "Hulled", marketValue: 160, predictedYield: 280 },
  { location: "AP", cropName: "Corn", cropType: "Sweet Corn", marketValue: 200, predictedYield: 320 },
  { location: "TN", cropName: "Rice", cropType: "Basmati", marketValue: 220, predictedYield: 290 },
  { location: "HR", cropName: "Wheat", cropType: "Bread Wheat", marketValue: 190, predictedYield: 330 },
];

const MarketValueDashboard = () => {
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    // In real case, you would fetch the data from an API
    // Example: setData(fetchMarketData());
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Crop Yield & Market Value Analysis
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
              Market Value Over Time
            </h2>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="marketValue" stroke="#8884d8" />
            </LineChart>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
              Predicted Crop Yield
            </h2>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="predictedYield" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl text-center font-semibold text-gray-700 mb-4">
            Detailed Crop Information
          </h2>
          <table className="table-auto w-full text-left text-gray-600">
            <thead>
              <tr>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Crop Name</th>
                <th className="px-4 py-2">Crop Type</th>
                <th className="px-4 py-2">Market Value</th>
                <th className="px-4 py-2">Predicted Yield</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">{item.cropName}</td>
                  <td className="border px-4 py-2">{item.cropType}</td>
                  <td className="border px-4 py-2">${item.marketValue}</td>
                  <td className="border px-4 py-2">{item.predictedYield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketValueDashboard;
