// YieldDashboard.js
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const YieldDashboard = ({ data }) => {
  return (
    <div>
      <h3>Yield Predictions</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="NPK" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="predictedYield" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YieldDashboard;
