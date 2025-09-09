const Tesseract = require("tesseract.js");

const filePath = "uploads/image.png"; // replace with your test image path

Tesseract.recognize(filePath, "eng")
  .then((result) => {
    console.log("===== OCR TEXT =====");
    console.log(result.data.text);
  })
  .catch((err) => {
    console.error("OCR failed:", err);
  });
