// controllers/receiptController.js

const Tesseract = require("tesseract.js");
const Transaction = require("../models/Transaction");
const { extractAmount, detectCategory } = require("../utils/receiptUtils");

const uploadReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Perform OCR
    const result = await Tesseract.recognize(req.file.path, "eng");
    const text = result.data.text;

    // Extract amount & category
    const amount = extractAmount(text);
    const category = detectCategory(text);

    // Save as transaction
    const transaction = new Transaction({
      user: req.user,
      type: "expense",
      amount,
      category,
      description: "Receipt upload",
      source: "receipt",
      date: new Date(),
    });

    await transaction.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process receipt" });
  }
};

module.exports = { uploadReceipt };
