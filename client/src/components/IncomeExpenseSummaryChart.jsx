import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import API from "../api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const IncomeExpenseSummaryChart = () => {
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let mounted = true;
  const fetchData = async () => {
    try {
      const { data } = await API.get("/transactions"); 
      // If paginated, get the transactions array
      const transactions = data.transactions || data;

      if (!mounted) return;

      let income = 0, expense = 0;
      transactions.forEach((t) => {
        if (t.type === "income") income += t.amount;
        else if (t.type === "expense") expense += t.amount;
      });

      setTotals({ income, expense });
    } catch (err) {
      console.error("Failed to fetch totals", err);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  fetchData();
  return () => { mounted = false; };
}, []);

  if (loading) return <p>Loading summary…</p>;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totals.income, totals.expense],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"],
        borderColor: ["#4bc0c0", "#ff6384"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Overall Summary</h3>
      <p>
        <strong>Total Income:</strong> ₹{totals.income.toLocaleString()} <br />
        <strong>Total Expense:</strong> ₹{totals.expense.toLocaleString()} <br />
        <strong>Net Balance:</strong>{" "}
        <span style={{ color: totals.income - totals.expense >= 0 ? "green" : "red" }}>
          ₹{(totals.income - totals.expense).toLocaleString()}
        </span>
      </p>
      <div style={{ height: "300px" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default IncomeExpenseSummaryChart;
