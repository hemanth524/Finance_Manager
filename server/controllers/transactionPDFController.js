const fs = require("fs");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Transaction = require("../models/Transaction"); // <-- import your model

// Initialize Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const processTransactionPDF = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    console.log("📄 Received PDF:", req.file.path);

    // Step 1: Extract text directly from PDF
    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(buffer);
    let rawText = pdfData.text.trim();

    if (!rawText) {
      return res.status(400).json({ error: "No text found in PDF. Is it scanned?" });
    }

    // Step 2: Ask Gemini to structure the transactions
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a financial assistant. Extract structured transactions from the text.
Return ONLY valid JSON array in this format:
[
  {
    "date": "YYYY-MM-DD",
    "description": "string",
    "amount": number,
    "type": "income" | "expense",
    "category": "string"
  }
]

Text:
"""${rawText}"""
    `;

    const result = await model.generateContent(prompt);
    const aiText = result.response.text();

    // Step 3: Parse AI JSON response
    const cleanJson = aiText.replace(/```json|```/g, "").trim();
    let parsedTransactions;

    try {
      parsedTransactions = JSON.parse(cleanJson);
    } catch (err) {
      console.error("❌ JSON parse error:", err, "Raw AI Output:", aiText);
      return res.status(500).json({ error: "Failed to parse AI response", raw: aiText });
    }

    // Step 4: Save parsed transactions to DB
    const userId = req.user; // from auth middleware
    const savedTransactions = await Transaction.insertMany(
      parsedTransactions.map((t) => ({
        ...t,
        user: userId,
        source: "pdf-upload"
      }))
    );

    // Step 5: Cleanup uploaded file
    fs.unlink(req.file.path, () => {});

    // Step 6: Return saved transactions
    res.json({
      count: savedTransactions.length,
      transactions: savedTransactions
    });

  } catch (err) {
    console.error("❌ Processing Error:", err);
    res.status(500).json({ error: "Failed to process transaction PDF" });
  }
};

module.exports = { processTransactionPDF };
