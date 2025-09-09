import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api";

const SpendingChart = ({ type }) => {
  const [data, setData] = useState([]);

const fetchSummary = async () => {
  try {
    const res = await API.get(`/transactions/summary?type=${type}`);
    // summary endpoint still returns array, so it's fine
    setData(res.data);
  } catch (err) {
    console.error("Failed to fetch summary", err);
  }
};

  useEffect(() => {
    fetchSummary();
  }, [type]);

  return (
    <div style={{ height: 300 }}>
      <h3>{type === "expense" ? "Expense by Category" : "Income by Category"}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill={type === "expense" ? "#e53935" : "#43a047"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
