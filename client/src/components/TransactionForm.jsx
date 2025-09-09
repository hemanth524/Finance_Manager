import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ReceiptUpload from "./ReceiptUpload";
import API from "../api";

const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  category: z.string().min(1, "Category is required"),
  amount: z.number({ invalid_type_error: "Amount must be a number" }).positive("Amount must be positive"),
  date: z.string().optional(),
  description: z.string().optional(),
});

const TransactionForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "income",
      category: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    },
  });

  const onSubmit = async (data) => {
    const id = toast.loading("Submitting transaction...");
    try {
      await API.post("/transactions", data);
      toast.update(id, { render: "Transaction added successfully!", type: "success", isLoading: false, autoClose: 5000 });
      reset({
        type: "income",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
    } catch (err) {
      toast.update(id, { render: err.response?.data?.error || "Failed to add transaction.", type: "error", isLoading: false, autoClose: 5000 });
    }
  };

  const handleReceiptUpload = useCallback((transaction) => {
    setValue("type", "expense", { shouldValidate: true });
    setValue("amount", transaction.amount, { shouldValidate: true });
    setValue("category", transaction.category, { shouldValidate: true });
    setValue("description", transaction.description || "Receipt upload", { shouldValidate: true });
    toast.info("Receipt data pre-filled!");
  }, [setValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-800/50 backdrop-blur-md border border-gray-700 shadow-2xl shadow-purple-900/20 rounded-2xl p-6 sm:p-8 w-full max-w-lg"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">New Transaction</h2>
        <p className="text-gray-400">Add an income or expense to your tracker.</p>
      </div>

      <ReceiptUpload onUploadSuccess={handleReceiptUpload} disabled={isSubmitting} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block font-semibold mb-2 text-gray-300">Type</label>
          <select
            {...register("type")}
            className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-white"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2 text-gray-300">Category</label>
            <input
              {...register("category")}
              type="text"
              placeholder="e.g., Salary"
              className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-white"
            />
            {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-300">Amount</label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-white"
            />
            {errors.amount && <p className="text-red-400 text-sm mt-1">{errors.amount.message}</p>}
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-300">Date</label>
          <input
            {...register("date")}
            type="date"
            className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-white"
          />
          {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-2 text-gray-300">Description (Optional)</label>
          <textarea
            {...register("description")}
            placeholder="A brief note..."
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition text-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isSubmitting ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </motion.div>
  );
};

export default TransactionForm;
