import { useEffect, useState } from "react";
import API from "../api";

const TransactionSummary = () => {
  const [summary, setSummary] = useState([]);

  const fetchSummary = async () => {
    try {
      const { data } = await API.get("/transactions/summary");
      setSummary(data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch summary");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div>
      <h2>Summary by Category</h2>
      <ul>
        {summary.map((item) => (
          <li key={item.category}>
            {item.category}: {item.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionSummary;
