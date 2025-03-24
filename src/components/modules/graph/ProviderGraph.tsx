"use client"
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "January", Created: 400, Ordered: 300, Sold: 250, Processing: 100 },
  { name: "February", Created: 500, Ordered: 450, Sold: 400, Processing: 120 },
  { name: "March", Created: 600, Ordered: 500, Sold: 450, Processing: 150 },
  { name: "April", Created: 550, Ordered: 520, Sold: 480, Processing: 130 },
  { name: "May", Created: 700, Ordered: 650, Sold: 600, Processing: 170 },
  { name: "June", Created: 800, Ordered: 720, Sold: 680, Processing: 200 },
];

const ProviderGraph = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Provider Meal Statistics</h2>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Created" fill="#8884d8" />
          <Bar dataKey="Ordered" fill="#82ca9d" />
          <Bar dataKey="Sold" fill="#ffc658" />
          <Bar dataKey="Processing" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProviderGraph;
