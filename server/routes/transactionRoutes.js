const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { 
  addTransaction, 
  getTransactions, 
  getSummary,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");

// ➤ Add transaction (Protected)
router.post("/", auth, addTransaction);

// ➤ Get all transactions (Protected, with optional date filter)
router.get("/", auth, getTransactions);

// ➤ Get summary by category (Protected)
router.get("/summary", auth, getSummary);

// ➤ Update a transaction by ID (Protected)
router.put("/:id", auth, updateTransaction);

// ➤ Delete a transaction by ID (Protected)
router.delete("/:id", auth, deleteTransaction);

module.exports = router;
