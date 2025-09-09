import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api";

const SpendingChart = ({ type }) => {
  const [data, setData] = useState([]); // Stores summary data from API

  // Fetch category-wise transaction summary (expense or income)
  const fetchSummary = async () => {
    try {
      const res = await API.get(`/transactions/summary?type=${type}`);
      setData(res.data); // Response is already an array of { category, total }
    } catch (err) {
      console.error("Failed to fetch summary", err);
    }
  };

  // Refetch whenever type (expense/income) changes
  useEffect(() => {
    fetchSummary();
  }, [type]);

  return (
    <div style={{ height: 300 }}>
      <h3>{type === "expense" ? "Expense by Category" : "Income by Category"}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines */}
          <XAxis dataKey="category" />             {/* X-axis = category name */}
          <YAxis />                                {/* Y-axis = totals */}
          <Tooltip />                              {/* Tooltip on hover */}
          <Bar 
            dataKey="total" 
            fill={type === "expense" ? "#e53935" : "#43a047"} // Red = expense, green = income
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
