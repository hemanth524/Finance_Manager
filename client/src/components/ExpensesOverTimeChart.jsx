import { useEffect, useState } from "react";
// Importing Recharts components to create a responsive line chart
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import API from "../api"; // Custom API module to make HTTP requests

// Functional component that shows either expenses or income over time
const ExpensesOverTimeChart = ({ type }) => {
  const [data, setData] = useState([]); // State to store formatted transaction data for the chart

  // Function to fetch transactions from the backend API
  const fetchTransactions = async () => {
    try {
      // API call: pass 'type' (expense/income) and a flag 'forChart' to fetch all relevant transactions
      const res = await API.get(`/transactions?type=${type}&forChart=true`);
      
      // If the response is paginated, extract the transactions array; otherwise use the raw response
      const transactions = res.data.transactions || res.data;

      // Format the transaction data for the chart
      const formatted = transactions.map((t) => ({
        date: new Date(t.date).toLocaleDateString(), // Convert the date to a readable format
        amount: t.amount, // Keep the transaction amount
      }));

      setData(formatted); // Save the formatted data in state
    } catch (err) {
      console.error("Failed to fetch transactions", err); // Log errors if the API call fails
    }
  };

  // useEffect runs when the component mounts and whenever 'type' changes
  useEffect(() => {
    fetchTransactions(); // Fetch transactions whenever the chart type (expense/income) changes
  }, [type]);

  return (
    <div style={{ height: 300 }}>
      {/* Title changes based on type */}
      <h3>{type === "expense" ? "Expenses Over Time" : "Income Over Time"}</h3>

      {/* Responsive container ensures chart adjusts to parent width/height */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines */}
          <XAxis dataKey="date" /> {/* X-axis shows dates */}
          <YAxis /> {/* Y-axis shows amounts */}
          <Tooltip /> {/* Tooltip shows data on hover */}
          <Line
            type="monotone" // Smooth line
            dataKey="amount" // Use 'amount' for Y-axis values
            stroke={type === "expense" ? "#e53935" : "#43a047"} // Red for expenses, green for income
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesOverTimeChart;
