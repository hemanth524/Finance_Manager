import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // Pie chart component
import API from "../api"; // API module
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const IncomeExpenseSummaryChart = () => {
  // State to store total income and expense
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(true); // Loading state while fetching data

  useEffect(() => {
    let mounted = true; // To prevent setting state if component unmounted
    const fetchData = async () => {
      try {
        const { data } = await API.get("/transactions"); 
        // If response is paginated, extract transactions array
        const transactions = data.transactions || data;

        if (!mounted) return; // Exit if component unmounted

        let income = 0, expense = 0;
        // Sum up income and expense amounts
        transactions.forEach((t) => {
          if (t.type === "income") income += t.amount;
          else if (t.type === "expense") expense += t.amount;
        });

        setTotals({ income, expense }); // Save totals in state
      } catch (err) {
        console.error("Failed to fetch totals", err);
      } finally {
        if (mounted) setLoading(false); // Stop loading
      }
    };

    fetchData();
    return () => { mounted = false; }; // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading summary…</p>; // Show loading indicator

  // Chart.js data structure for Pie chart
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [totals.income, totals.expense],
        backgroundColor: ["rgba(75, 192, 192, 0.7)", "rgba(255, 99, 132, 0.7)"], // Pie colors
        borderColor: ["#4bc0c0", "#ff6384"], // Border colors
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h3>Overall Summary</h3>
      {/* Display totals and net balance */}
      <p>
        <strong>Total Income:</strong> ₹{totals.income.toLocaleString()} <br />
        <strong>Total Expense:</strong> ₹{totals.expense.toLocaleString()} <br />
        <strong>Net Balance:</strong>{" "}
        <span style={{ color: totals.income - totals.expense >= 0 ? "green" : "red" }}>
          ₹{(totals.income - totals.expense).toLocaleString()}
        </span>
      </p>

      {/* Render Pie chart */}
      <div style={{ height: "300px" }}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default IncomeExpenseSummaryChart;
