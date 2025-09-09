import React from "react";
import TransactionForm from "../components/TransactionForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 bg-gray-900 bg-gradient-to-br from-gray-900 via-purple-900/60 to-gray-900 text-white font-sans overflow-hidden">
      <TransactionForm />
    </div>
  );
};

export default App;
