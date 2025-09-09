import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api";

// Fixed color palette for slices
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const SpendingPieChart = ({ type }) => {
  const [data, setData] = useState([]); // Stores summary data from API

  // Fetch category summary for pie chart
  const fetchSummary = async () => {
    try {
      const res = await API.get(`/transactions/summary?type=${type}`);
      setData(res.data); // Example: [{ category: "Food", total: 500 }, ...]
    } catch (err) {
      console.error("Failed to fetch summary", err);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [type]);

  return (
    <div style={{ height: 300 }}>
      <h3>{type === "expense" ? "Expense Distribution" : "Income Distribution"}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* Pie slice setup */}
          <Pie
            data={data}
            dataKey="total"        // The numeric value for slice size
            nameKey="category"     // Slice labels
            cx="50%" cy="50%"      // Center of chart
            outerRadius={100}      // Size of pie
            fill="#8884d8"
            label                  // Show labels on slices
          >
            {/* Assign different colors to each slice */}
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip /> {/* Hover tooltip shows category + total */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingPieChart;
