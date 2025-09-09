import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { 
  DollarSign, TrendingUp, TrendingDown, Wallet, PieChart, BarChart3,
  Calendar, Target, CreditCard, ArrowUpRight, ArrowDownRight, Plus,
  Filter, Download, Bell, Settings, User, Search, RefreshCw, AlertCircle
} from "lucide-react";

const Dashboard = ({ refreshFlag }) => {
  const { user } = useContext(AuthContext);
  const [timeFilter, setTimeFilter] = useState("month");
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
    recentTransactions: [],
    expensesByCategory: [],
    incomeByCategory: [],
    monthlyTrend: [],
  });
  const [error, setError] = useState(null);

  // Calculate date range based on filter
  const getDateRange = () => {
    const now = new Date();
    let from;
    if (timeFilter === "week") {
      from = new Date();
      from.setDate(now.getDate() - 7);
    } else if (timeFilter === "month") {
      from = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (timeFilter === "year") {
      from = new Date(now.getFullYear(), 0, 1);
    } else {
      from = new Date(0); // all time
    }
    return { from: from.toISOString(), to: now.toISOString() };
  };

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { from, to } = getDateRange();

      // Fetch all transactions for calculations
      const transactionsRes = await API.get(`/transactions?forChart=true&from=${from}&to=${to}`);
      const allTransactions = transactionsRes.data.transactions || transactionsRes.data;

      // Fetch recent transactions
      const recentRes = await API.get(`/transactions?page=1&limit=5&from=${from}&to=${to}`);
      const recentTransactions = recentRes.data.transactions || recentRes.data;

      // Fetch summary by type
      const expenseSummaryRes = await API.get(`/transactions/summary?type=expense&from=${from}&to=${to}`);
      const incomeSummaryRes = await API.get(`/transactions/summary?type=income&from=${from}&to=${to}`);

      let totalIncome = 0;
      let totalExpenses = 0;

      allTransactions.forEach((t) => {
        if (t.type === "income") totalIncome += t.amount;
        else if (t.type === "expense") totalExpenses += t.amount;
      });

      const netBalance = totalIncome - totalExpenses;

      setDashboardData({
        totalIncome,
        totalExpenses,
        netBalance,
        recentTransactions,
        expensesByCategory: expenseSummaryRes.data,
        incomeByCategory: incomeSummaryRes.data,
        savingsRate: totalIncome > 0 ? (netBalance / totalIncome) * 100 : 0,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [timeFilter]);

  // Fetch dashboard whenever user, timeFilter, or refreshFlag changes
  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user, timeFilter, refreshFlag, fetchDashboardData]);

  // ---------- UI Components ----------
  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}><Icon className="w-6 h-6 text-white" /></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  const TransactionItem = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}>
          {transaction.type === "income" ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{transaction.description || transaction.category}</h4>
          <p className="text-sm text-gray-500">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className={`font-bold text-lg ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
        {transaction.type === "income" ? "+" : "-"}₹{Math.abs(transaction.amount).toLocaleString()}
      </div>
    </div>
  );

  const CategoryItem = ({ category, isExpense = true }) => {
    const data = isExpense ? dashboardData.expensesByCategory : dashboardData.incomeByCategory;
    const maxAmount = Math.max(...data.map(c => c.total));
    const percentage = maxAmount > 0 ? (category.total / maxAmount) * 100 : 0;

    return (
      <div className="p-4 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-700 font-medium">{category.category}</span>
          <span className="font-semibold text-gray-800">₹{category.total.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`h-2 rounded-full ${isExpense ? "bg-red-400" : "bg-green-400"}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    );
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  // ---------- Main Render ----------
  return (
    <div className="min-h-screen bg-gray-300 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name || "User"}!</h1>
          <div className="flex items-center gap-4">
            <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)} className="px-4 py-2 border rounded-lg">
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button onClick={fetchDashboardData}><RefreshCw /></button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Income" value={`₹${dashboardData.totalIncome.toLocaleString()}`} icon={TrendingUp} color="bg-green-500" subtitle={`${dashboardData.incomeByCategory.length} sources`} />
          <StatCard title="Total Expenses" value={`₹${dashboardData.totalExpenses.toLocaleString()}`} icon={TrendingDown} color="bg-red-500" subtitle={`${dashboardData.expensesByCategory.length} categories`} />
          <StatCard title="Net Balance" value={`₹${dashboardData.netBalance.toLocaleString()}`} icon={Wallet} color={dashboardData.netBalance >= 0 ? "bg-blue-500" : "bg-orange-500"} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h2>
            <div className="space-y-2">
              {dashboardData.recentTransactions.length > 0 ? (
                dashboardData.recentTransactions.map(t => (
                  <TransactionItem key={t._id} transaction={t} />
                ))
              ) : (
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Expenses / Graph */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Top Expenses</h2>
            <div className="space-y-3">
              {dashboardData.expensesByCategory.length > 0 ? (
                dashboardData.expensesByCategory.slice(0, 5).map((cat, i) => (
                  <CategoryItem key={i} category={cat} isExpense />
                ))
              ) : (
                <div className="text-center py-8">
                  <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No expenses recorded</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
