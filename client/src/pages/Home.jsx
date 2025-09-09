import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
  Target,
  Zap,
  DollarSign,
  Eye,
  Users,
} from "lucide-react";
import Sliding from "../components/Sliding";

const monthlyData = [
  { month: "Jan", income: 4500, expenses: 3200 },
  { month: "Feb", income: 4800, expenses: 3100 },
  { month: "Mar", income: 4600, expenses: 3400 },
  { month: "Apr", income: 5200, expenses: 3800 },
  { month: "May", income: 4900, expenses: 3300 },
  { month: "Jun", income: 5400, expenses: 3600 },
];

const expenseData = [
  { name: "Housing", value: 35, color: "#3B82F6" },
  { name: "Food", value: 20, color: "#10B981" },
  { name: "Transport", value: 15, color: "#F59E0B" },
  { name: "Entertainment", value: 10, color: "#EF4444" },
  { name: "Utilities", value: 12, color: "#8B5CF6" },
  { name: "Others", value: 8, color: "#6B7280" },
];

const savingsData = [
  { month: "Jan", savings: 1300 },
  { month: "Feb", savings: 1700 },
  { month: "Mar", savings: 1200 },
  { month: "Apr", savings: 1400 },
  { month: "May", savings: 1600 },
  { month: "Jun", savings: 1800 },
];

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
         <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Eye className="w-4 h-4" />
            Financial Visibility Platform
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            We Bring Visibility <br />
            to Your Finances
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your financial management with intelligent insights,
            real-time tracking, and powerful analytics that help you make
            informed decisions about your money.
          </p>

          {/* Replaced buttons with text + login link */}
          <p className="text-lg text-black font-bold">
            Become member and track your expense —{" "}
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthOpen(true);
              }}
              className="text-blue-600 font-semibold hover:underline hover:cursor-pointer"
            >
              Login here
            </button>
          </p>
        </div>


        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">50K+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">$2.5B+</h3>
            <p className="text-gray-600">Tracked Monthly</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">94%</h3>
            <p className="text-gray-600">User Satisfaction</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart Analytics</h3>
            <p className="text-gray-600 leading-relaxed">
              Automatically categorize expenses, identify spending patterns, for easy
              understanding of income and expense
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-Time Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your financial activities as they happen with instant updates,
              automatic categorization, and seamless integration with your accounts for
              complete visibility.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Goal Achievement</h3>
            <p className="text-gray-600 leading-relaxed">
              Set and track financial goals with intelligent milestone tracking, progress
              visualization, and actionable steps to reach your targets faster.
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">See Your Money in Action</h2>
            <p className="text-xl text-gray-600">Real-time visualizations that make financial data meaningful</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Income vs Expenses */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Income vs Expenses</h3>
                  <p className="text-gray-500 text-sm">Monthly comparison overview</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#64748b" }} />
                  <Tooltip
                    formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="income" fill="#10b981" name="Income" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="expenses" fill="#f59e0b" name="Expenses" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <PieChartIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Expense Categories</h3>
                  <p className="text-gray-500 text-sm">Spending distribution</p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row items-center">
                <ResponsiveContainer width="60%" height={250}>
                  <PieChart>
                    <Pie data={expenseData} cx="50%" cy="50%" innerRadius={50} outerRadius={100} paddingAngle={3} dataKey="value">
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Share"]}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-1 gap-3 lg:ml-4">
                  {expenseData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Sliding auth panel */}
      <Sliding isOpen={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
