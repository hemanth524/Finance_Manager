const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");

// ➤ Add a new transaction
exports.addTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description, source } = req.body;

    const transaction = new Transaction({
      user: req.user,
      type,
      category,
      amount,
      date: date || Date.now(),
      description,
      source: source || "manual",
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➤ Get transactions (with filters: from-to date and type)
exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, from, to, type, forChart } = req.query;
    const query = { user: req.user };

    if (type) query.type = type;

    if (from && to) {
      query.date = { $gte: new Date(from), $lte: new Date(to) };
    }

    if (forChart === "true") {
      const transactions = await Transaction.find(query).sort({ date: 1 });
      return res.json(transactions);
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Transaction.countDocuments(query);

    res.json({
      transactions,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

// ➤ Get summary grouped by category with optional type & date range
exports.getSummary = async (req, res) => {
  try {
    const { type, from, to } = req.query;

    const matchStage = { user: new mongoose.Types.ObjectId(req.user) };
    if (type) matchStage.type = type;
    if (from && to) matchStage.date = { $gte: new Date(from), $lte: new Date(to) };

    const summary = await Transaction.aggregate([
      { $match: matchStage },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
    ]);

    const result = summary.map((item) => ({
      category: item._id,
      total: item.total,
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
