// utils/receiptUtils.js

// Extract total amount from receipt text
const extractAmount = (text) => {
  const lowerText = text.toLowerCase();
  const lines = lowerText.split("\n");

  // Look for lines that contain 'grand total' or 'total'
  for (let line of lines.reverse()) {
    if (line.includes("grand total")) {
      const match = line.match(/\d+(\.\d{1,2})?/);
      if (match) return parseFloat(match[0]);
    }
  }

  for (let line of lines.reverse()) {
    if (line.includes("total")) {
      const match = line.match(/\d+(\.\d{1,2})?/);
      if (match) return parseFloat(match[0]);
    }
  }

  // Fallback: pick the largest number in the receipt text
  const numbers = text.match(/\d+(\.\d{1,2})?/g)?.map(Number) || [];
  return numbers.length > 0 ? Math.max(...numbers) : 0;
};

// Detect category based on keywords
const detectCategory = (text) => {
  const lowerText = text.toLowerCase();

  // Grocery / Supermarket
  if (
    lowerText.includes("walmart") ||
    lowerText.includes("supermarket") ||
    lowerText.includes("grocery")
  )
    return "Grocery";

  // Fuel / Petrol
  if (
    lowerText.includes("petrol") ||
    lowerText.includes("fuel") ||
    lowerText.includes("shell") ||
    lowerText.includes("bp")
  )
    return "Fuel";

  // Dining / Restaurant
  if (
    lowerText.includes("restaurant") ||
    lowerText.includes("dining") ||
    lowerText.includes("cafe") ||
    lowerText.includes("food")
  )
    return "Dining";

  // Travel
  if (
    lowerText.includes("uber") ||
    lowerText.includes("ola") ||
    lowerText.includes("taxi") ||
    lowerText.includes("bus") ||
    lowerText.includes("train") ||
    lowerText.includes("flight") ||
    lowerText.includes("airlines")
  )
    return "Travel";

  // Default fallback
  return "Miscellaneous";
};


module.exports = { extractAmount, detectCategory };
