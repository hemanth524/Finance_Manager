const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  type: { 
    type: String, 
    enum: ["income", "expense"], 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String 
  },
  source: { 
    type: String, 
    default: "manual" // manual | receipt (later for OCR)
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
