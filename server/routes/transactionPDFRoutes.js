const express = require("express");
const multer = require("multer");
const path = require("path")
const { processTransactionPDF } = require("../controllers/transactionPDFController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route
router.post("/upload-pdf", auth, upload.single("file"), processTransactionPDF);

module.exports = router;
