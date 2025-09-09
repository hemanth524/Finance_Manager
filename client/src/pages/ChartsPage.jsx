import { useState } from "react";
import SpendingChart from "../components/SpendingChart";
import ExpensesOverTimeChart from "../components/ExpensesOverTimeChart";
import SpendingPieChart from "../components/SpendingPieChart";
import IncomeExpenseSummaryChart from "../components/IncomeExpenseSummaryChart";

const ChartsPage = () => {
  const [selectedType, setSelectedType] = useState("expense"); // default expense

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-6 bg-gray-900 bg-gradient-to-br from-gray-900 via-purple-900/60 to-gray-900 text-white font-sans overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      <h1 className="text-4xl md:text-5xl font-bold mb-8 z-10 text-center animate-bounce">
        📊 Charts & Analytics
      </h1>

      {/* Toggle Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 z-10">
        {["expense", "income"].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 ${
              selectedType === type
                ? type === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
                : "bg-gray-800 text-gray-200 hover:bg-gray-700"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Flex layout for charts */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl z-10">
        <div className="flex-1 min-w-[320px] bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <IncomeExpenseSummaryChart />
        </div>
        <div className="flex-1 min-w-[320px] bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <SpendingChart type={selectedType} />
        </div>
        <div className="flex-1 min-w-[320px] bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <ExpensesOverTimeChart type={selectedType} />
        </div>
        <div className="flex-1 min-w-[320px] bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
          <SpendingPieChart type={selectedType} />
        </div>
      </div>
    </div>
  );
};

export default ChartsPage;
