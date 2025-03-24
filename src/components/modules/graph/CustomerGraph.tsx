"use client"; // Add this at the top
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const orderData = [
  { month: "Jan", orders: 40 },
  { month: "Feb", orders: 55 },
  { month: "Mar", orders: 75 },
  { month: "Apr", orders: 90 },
];

const preferenceData = [
  { meal: "Pizza", count: 120 },
  { meal: "Burger", count: 90 },
  { meal: "Pasta", count: 70 },
  { meal: "Salad", count: 50 },
];

const reviewData = [
  { name: "5 Stars", value: 60 },
  { name: "4 Stars", value: 25 },
  { name: "3 Stars", value: 10 },
  { name: "2 Stars", value: 3 },
  { name: "1 Star", value: 2 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000"];

const CustomerGraph = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Orders Over Time */}
      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Customer Orders Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={orderData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Meal Preferences */}
      <div className="bg-white p-4 shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-2">Meal Preferences</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={preferenceData}>
            <XAxis dataKey="meal" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Reviews */}
      <div className="bg-white p-4 shadow rounded-xl col-span-1 md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={reviewData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {reviewData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerGraph;