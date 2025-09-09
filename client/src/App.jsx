import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import AddTransactionPage from "./pages/AddTransactionPage";
import TransactionsPage from "./pages/TransactionsPage";

import ChartsPage from "./pages/ChartsPage";  // ✅ import charts page
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransactionPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/charts" element={<ChartsPage />} />  {/* ✅ new charts route */}
        </Routes>
        <Footer/>
    </AuthProvider>
  );
}

export default App;
