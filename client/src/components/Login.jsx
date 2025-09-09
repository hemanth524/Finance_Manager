import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function Login({ onSuccess, onSwitchToSignup }) {
  const { login } = useContext(AuthContext); // Auth context for login
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema), // Validation using zod
  });

  // Form submission handler
  const onSubmit = async (values) => {
    try {
      const { data } = await API.post("/auth/login", values);
      login(data?.user ?? null, data?.token ?? null); // Save user & token in context
      onSuccess?.(); // Optional callback
      navigate("/dashboard"); // Redirect after login
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed"); // Show error
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Welcome Back
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Email input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            {...register("email")}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
        </div>

        {/* Form actions */}
        <div className="flex items-center justify-between mt-6">
          {/* Switch to signup */}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-sm text-blue-600 hover:underline"
          >
            Don’t have an account?
          </button>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md transition transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
