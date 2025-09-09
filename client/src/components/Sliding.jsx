import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Signup from "./Signup";

export default function Sliding({ isOpen, initialMode = "login", onClose }) {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => setMode(initialMode), [initialMode]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleSuccess = () => onClose?.();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-600 shadow-2xl z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 bg-white/10 backdrop-blur-md">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {mode === "login" ? "Welcome Back" : "Create Your Account"}
                </h3>
                <p className="text-sm text-gray-200">
                  {mode === "login"
                    ? "Sign in to access your dashboard"
                    : "Join and start tracking your finances"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setMode(mode === "login" ? "signup" : "login")
                  }
                  className="text-sm px-3 py-1 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
                >
                  {mode === "login" ? "Sign up" : "Sign in"}
                </button>
                <button
                  onClick={onClose}
                  className="text-white hover:text-red-300 p-2 rounded-md"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
              <div className="w-full max-w-md">
                {mode === "login" ? (
                  <Login
                    onSuccess={handleSuccess}
                    onSwitchToSignup={() => setMode("signup")}
                  />
                ) : (
                  <Signup
                    onSuccess={handleSuccess}
                    onSwitchToLogin={() => setMode("login")}
                  />
                )}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
