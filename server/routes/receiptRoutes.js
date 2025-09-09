const express = require('express');
const multer = require('multer');
const path = require("path");
const { processAIReceipt } = require('../controllers/aiReceiptController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/process-ai', auth, upload.single('file'), processAIReceipt);

module.exports = router;
