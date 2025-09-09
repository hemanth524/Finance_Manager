const express = require("express");
const multer = require("multer");
const { processTransactionPDF } = require("../controllers/transactionPDFController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Route
router.post("/upload-pdf", auth, upload.single("file"), processTransactionPDF);

module.exports = router;
