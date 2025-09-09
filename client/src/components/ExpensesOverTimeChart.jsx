import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api";

const ExpensesOverTimeChart = ({ type }) => {
  const [data, setData] = useState([]);

  const fetchTransactions = async () => {
    try {
      // Add a query param to get all transactions without pagination for charts
      const res = await API.get(`/transactions?type=${type}&forChart=true`);
      
      // If paginated response, use transactions array
      const transactions = res.data.transactions || res.data;

      const formatted = transactions.map((t) => ({
        date: new Date(t.date).toLocaleDateString(),
        amount: t.amount,
      }));
      setData(formatted);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [type]);

  return (
    <div style={{ height: 300 }}>
      <h3>{type === "expense" ? "Expenses Over Time" : "Income Over Time"}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="amount"
            stroke={type === "expense" ? "#e53935" : "#43a047"}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesOverTimeChart;
