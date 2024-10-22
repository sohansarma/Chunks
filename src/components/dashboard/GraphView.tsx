import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Instagram", followers: 4000, engagement: 2400 },
  { name: "Facebook", followers: 3000, engagement: 1398 },
  { name: "YouTube", followers: 2000, engagement: 9800 },
  { name: "Twitter", followers: 2780, engagement: 3908 },
];

const GraphView: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Social Media Analytics</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="followers" fill="#8884d8" />
          <Bar dataKey="engagement" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphView;
