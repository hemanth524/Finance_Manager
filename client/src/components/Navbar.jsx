import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect home
    setIsOpen(false);
  };

  const linkClasses =
    "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:bg-indigo-600 cursor-pointer";

  const authButtonClasses =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer";

  return (
    <nav className=" top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      {/* Brand */}
      <h2
        className="text-2xl font-extrabold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        Finance Assistant
      </h2>

      {/* Desktop Links */}
      {user && (
        <div className="hidden md:flex space-x-4">
          <Link className={linkClasses} to="/dashboard">
            Dashboard
          </Link>
          <Link className={linkClasses} to="/add-transaction">
            Add Transaction
          </Link>
          <Link className={linkClasses} to="/transactions">
            All Transactions
          </Link>
          <Link className={linkClasses} to="/charts">
            Analytics
          </Link>
        </div>
      )}

      {/* Right side: user info + logout */}
      {user && (
        <div className="hidden md:flex items-center space-x-3">
          <span className="font-medium">Hello, {user.name}</span>
          <button
            onClick={handleLogout}
            className={`${authButtonClasses} bg-red-500 hover:bg-red-600 text-white`}
          >
            Logout
          </button>
        </div>
      )}

      {/* Hamburger for mobile */}
      {user && (
        <button
          className="md:hidden focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      )}

      {/* Mobile Menu */}
      {isOpen && user && (
        <div className="absolute top-full left-0 w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white flex flex-col items-center py-4 md:hidden space-y-3 shadow-lg">
          <Link
            className={linkClasses}
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            className={linkClasses}
            to="/add-transaction"
            onClick={() => setIsOpen(false)}
          >
            Add Transaction
          </Link>
          <Link
            className={linkClasses}
            to="/transactions"
            onClick={() => setIsOpen(false)}
          >
            All Transactions
          </Link>
          <Link
            className={linkClasses}
            to="/summary"
            onClick={() => setIsOpen(false)}
          >
            Summary
          </Link>
          <Link
            className={linkClasses}
            to="/charts"
            onClick={() => setIsOpen(false)}
          >
            Charts
          </Link>
          <div className="flex flex-col items-center space-y-2 mt-2">
            <span>Hello, {user.name}</span>
            <button
              onClick={handleLogout}
              className={`${authButtonClasses} bg-red-500 hover:bg-red-600 text-white`}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

