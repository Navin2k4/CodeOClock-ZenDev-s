import React, { useEffect, useState } from "react";
import { fetchCoordinates } from "../../../api/utils/util";
import * as tf from "@tensorflow/tfjs";
import {
  createModel,
  preprocessData,
  trainModel,
} from "../../../api/utils/analysingfunctions/modelUtils.js";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import FertilizerDashboard from "./FertilizerDashboard .jsx";

const DisplayFertilizerData = () => {
  const formData = useSelector((state) => state.form);
  const { location, soilType, cropType, growthStage } = formData; // Destructure the form data
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const trainingData = tf.tensor2d([
    // N, P, K, pH, Soil Type (0-1), Crop Type (0-1), Fertilizer Type (0-1), Location (0-1), Growth Stage (0-1)
    [30, 15, 25, 5.5, 0, 1, 0, 0, 0],
    [35, 25, 30, 6.0, 0, 1, 0, 0, 0],
    [40, 30, 35, 6.3, 0, 1, 1, 0, 0],
    [50, 20, 30, 6.5, 1, 0, 1, 0, 1],
    [55, 40, 25, 6.8, 1, 0, 0, 1, 1],
    [60, 50, 40, 6.0, 1, 0, 0, 1, 1],
    [70, 25, 30, 7.0, 0, 1, 0, 1, 0],
    [65, 30, 35, 6.4, 0, 1, 1, 1, 1],
    [75, 60, 50, 6.2, 1, 1, 1, 0, 1],
    [80, 35, 40, 6.6, 1, 1, 0, 0, 0],
    [85, 55, 45, 6.7, 1, 1, 1, 0, 1],
    [90, 70, 60, 7.1, 0, 0, 0, 0, 0],
    [95, 40, 50, 7.5, 0, 0, 1, 1, 1],
    [40, 30, 20, 5.8, 0, 1, 0, 0, 0],
    [30, 10, 15, 5.3, 0, 0, 1, 0, 0],
    [50, 40, 30, 6.1, 1, 1, 1, 0, 0],
    [65, 55, 35, 6.9, 0, 1, 1, 1, 1],
    [70, 20, 25, 6.4, 1, 0, 0, 1, 0],
    [20, 15, 10, 5.2, 0, 0, 1, 0, 0],
    [90, 50, 55, 7.0, 1, 1, 1, 1, 1],
    [60, 20, 15, 6.8, 0, 0, 0, 1, 0],
  ]);

  const trainingLabels = tf.tensor2d([
    [100], // Yield for first input
    [110],
    [120],
    [150],
    [140],
    [160],
    [130],
    [170],
    [180],
    [190],
    [200],
    [210],
    [220],
    [230],
    [240],
    [250],
    [260],
    [270],
    [280],
    [290],
    [300],
  ]);

  useEffect(() => {
    const initializeModel = async () => {
      const newModel = createModel();
      await trainModel(newModel, trainingData, trainingLabels);
      setModel(newModel);
    };

    initializeModel();
  }, []);

  useEffect(() => {
    const generatePredictions = () => {
      const results = [];
      const N_values = [40, 50, 60]; // Example nitrogen values
      const P_values = [20, 30, 40]; // Example phosphorus values
      const K_values = [30, 40, 50]; // Example potassium values
      const pH_values = [6.0, 6.5, 7.0]; // Example pH values

      N_values.forEach((N) => {
        P_values.forEach((P) => {
          K_values.forEach((K) => {
            pH_values.forEach((pH) => {
              const input = preprocessData(
                N,
                P,
                K,
                pH,
                soilType,
                cropType,
                location,
                growthStage,
                0
              ); // Dummy values for fertilizer type
              const predictedYield = model.predict(input).dataSync()[0];
              results.push({
                nitrogen: N,
                phosphorus: P,
                potassium: K,
                pH: pH,
                yield: predictedYield,
              });
            });
          });
        });
      });

      setPredictions(results);
    };

    if (model) {
      generatePredictions();
    }
  }, [model, soilType, cropType, location, growthStage]);

  return (
    <div >
      <FertilizerDashboard predictions={predictions} />
  

      <h4 className="p-10 text-2xl py-2 font-semibold text-gray-700 mb-4">
        Predicted Yield based on Different NPK and pH Values
      </h4>
      <div
        className="grid grid-cols-2 gap-4 p-2"
        style={{ padding: "30px" }}
      >
        <ResponsiveContainer width="100%" className=" pr-3 pt-3 rounded-xl bg-slate-100 shadow-xl" height={400}>
          <LineChart
            data={predictions}
            
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nitrogen" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#8884d8"
              strokeWidth={3}
            /> 
            <text x={250} y={20} textAnchor="middle" dominantBaseline="middle">
              Predicted Yield by Nitrogen Levels
            </text>
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" className=" pr-3 pt-3 rounded-xl bg-red-100 shadow-xl" height={400}>
          <LineChart
            data={predictions}
            className="mt-2"

          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="phosphorus" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#82ca9d"
              strokeWidth={3}
   
            />
            <text x={250} y={20} textAnchor="middle" dominantBaseline="middle">
              Predicted Yield by Phosphorus Levels
            </text>
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" className=" pr-3 pt-3 rounded-xl bg-green-100 shadow-xl" height={400}>
          <LineChart
            data={predictions}
            className="mt-2"

          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="potassium" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#ffc658"
              strokeWidth={3}
         
            />
            <text x={250} y={20} textAnchor="middle" dominantBaseline="middle">
              Predicted Yield by Potassium Levels
            </text>
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" className=" pr-3 pt-3 rounded-xl bg-cyan-100 shadow-xl" height={400}>
          <LineChart
            data={predictions}
            className="mt-2"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="pH" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="yield"
              stroke="#ff7300"
              strokeWidth={3}
         
            />
            <text x={250} y={20} textAnchor="middle" dominantBaseline="middle">
              Predicted Yield by pH Levels
            </text>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DisplayFertilizerData;
