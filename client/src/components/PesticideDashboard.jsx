import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dummyPesticideData = [
  { cropName: "Wheat", pestInfestationLevel: 20, recommendedPesticide: "Chlorpyrifos", pesticideEffectiveness: 85 },
  { cropName: "Rice", pestInfestationLevel: 35, recommendedPesticide: "Buprofezin", pesticideEffectiveness: 75 },
  { cropName: "Barley", pestInfestationLevel: 50, recommendedPesticide: "Imidacloprid", pesticideEffectiveness: 90 },
  { cropName: "Corn", pestInfestationLevel: 30, recommendedPesticide: "Lambda-cyhalothrin", pesticideEffectiveness: 70 },
  { cropName: "Soybean", pestInfestationLevel: 60, recommendedPesticide: "Spinosad", pesticideEffectiveness: 80 },
];

const pesticideEffectivenessData = [
  { name: "Chlorpyrifos", value: 85 },
  { name: "Buprofezin", value: 75 },
  { name: "Imidacloprid", value: 90 },
  { name: "Lambda-cyhalothrin", value: 70 },
  { name: "Spinosad", value: 80 },
];

const PesticideDashboard = () => {
  const [data, setData] = useState(dummyPesticideData);

  useEffect(() => {
    // Replace with API call if needed.
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Pesticide Usage Analysis Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Pest Infestation Level by Crop
            </h2>
            <BarChart width={500} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cropName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pestInfestationLevel" fill="#8884d8" />
            </BarChart>
          </div>

          <div className="bg-white p-6 items-center flex flex-col rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Pesticide Effectiveness
            </h2>
            <PieChart width={500} height={300} >
              <Pie
                data={pesticideEffectivenessData}
                cx={200}
                cy={150}
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pesticideEffectivenessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 flex flex-col items-center rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recommended Pesticides for Each Crop
          </h2>
          <table className="table-auto w-full text-left text-gray-600">
            <thead>
              <tr>
                <th className="px-4 py-2">Crop Name</th>
                <th className="px-4 py-2">Pest Infestation Level</th>
                <th className="px-4 py-2">Recommended Pesticide</th>
                <th className="px-4 py-2">Pesticide Effectiveness (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.cropName}</td>
                  <td className="border px-4 py-2">{item.pestInfestationLevel}%</td>
                  <td className="border px-4 py-2">{item.recommendedPesticide}</td>
                  <td className="border px-4 py-2">{item.pesticideEffectiveness}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PesticideDashboard;
