const { GoogleGenAI } = require('@google/genai'); // Node.js require
const Tesseract = require('tesseract.js');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

console.log(process.env.GEMINI_API_KEY);

// Initialize Gemini AI client
const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const processAIReceipt = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });    

    const ext = path.extname(req.file.originalname).toLowerCase();
    let receiptText = '';

    // Step 1: Extract text based on file type
    if (ext === '.pdf') {
      const pdfBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(pdfBuffer);
      receiptText = pdfData.text;
    } else if (['.jpg', '.jpeg', '.png', '.bmp', '.tiff'].includes(ext)) {
      const ocrResult = await Tesseract.recognize(req.file.path, 'eng');
      receiptText = ocrResult.data.text;
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Use image or PDF.' });
    }

   

    // Step 2: Send text to Gemini AI
    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        `You are an expert financial assistant. Extract structured info from receipts.
Return only JSON in this format:
{
  "amount": 0,
  "category": "string",
  "date": "YYYY-MM-DD",
  "description": "string"
}
Text: """${receiptText}"""`,
      ],
      temperature: 0,
    });

    // Step 3: Extract AI output
    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) return res.status(500).json({ error: 'No AI output returned from Gemini' });

    // Remove ```json fences
    const cleanText = rawText.replace(/```json|```/g, '').trim();

    // Step 4: Parse JSON safely
    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.error('JSON Parse Error:', err, 'Clean Text:', cleanText);
      return res.status(500).json({ error: 'Failed to parse AI response', raw: cleanText });
    }

    res.json(parsed);

    // Delete uploaded file
    fs.unlink(req.file.path, () => {});
  } catch (err) {
    console.error('Processing Error:', err);
    res.status(500).json({ error: 'Failed to process receipt' });
  }
};

module.exports = { processAIReceipt };
