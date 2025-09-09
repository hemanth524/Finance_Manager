# AI-Powered Finance Manager

An intelligent web application designed to simplify personal finance management. Users can track income and expenses manually or automate the process by uploading receipts (images/PDFs) and transaction statements (PDFs). It leverages Google's Gemini AI to parse and categorize transactions automatically, providing insightful visualizations of financial habits.

---

## ✨ Key Features

- **User Authentication:** Secure JWT-based authentication for registration and login.
- **Manual Transactions:** Add, edit, and delete income and expense records with ease.
- **AI-Powered Receipt Scanning:** Upload a picture or PDF of a receipt, and the AI extracts the total amount, date, category, and description automatically.
- **PDF Statement Processing:** Upload PDF bank or credit card statements to bulk-import multiple transactions at once.
- **Interactive Dashboard:** Visualize your financial data with dynamic charts:
  - Spending by category (Pie Chart)
  - Income vs. Expense summary (Bar Chart)
  - Expenses over time (Line Chart)
- **Responsive Design:** A clean and modern interface built with React and Tailwind CSS, optimized for desktop and mobile devices.

---

## 🛠️ Tech Stack

| Area             | Technology |
|-----------------|------------|
| Frontend        | React.js, Vite, Tailwind CSS, Axios, Recharts, React Toastify |
| Backend         | Node.js, Express.js, MongoDB with Mongoose |
| AI & OCR        | Google Gemini AI, Tesseract.js, pdf-parse |
| File Handling   | Multer |
| Authentication  | JWT, bcryptjs |

---

## 💾 Project Structure

```
finance-manager/
├── client/         # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
├── server/         # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm (comes with Node.js)
- MongoDB installed locally or a connection string from MongoDB Atlas

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/finance-manager.git
cd finance-manager
```

2. **Setup the Backend (`/server`):**

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

3. **Setup the Frontend (`/client`):**

```bash
cd ../client
npm install
```

Create a `.env` file in `/client`:

```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

- **Start the Backend:**

```bash
cd server
npm start
```

Server runs on: `http://localhost:5000`

- **Start the Frontend:**

```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📑 API Endpoints

All routes are prefixed with `/api`.

| Method | Endpoint                     | Description                                 | Protected |
|--------|------------------------------|---------------------------------------------|-----------|
| POST   | /auth/register               | Register a new user                         | No        |
| POST   | /auth/login                  | Log in an existing user                     | No        |
| GET    | /transactions                | Get all transactions for the logged-in user| Yes       |
| POST   | /transactions                | Add a new transaction                       | Yes       |
| PUT    | /transactions/:id            | Update an existing transaction              | Yes       |
| DELETE | /transactions/:id            | Delete a transaction                        | Yes       |
| POST   | /receipts/process-ai         | Upload an image/PDF receipt for AI processing | Yes    |
| POST   | /transactions/upload-pdf     | Upload PDF statement for bulk transaction import | Yes |

---

## 💪 Dashboard Visualizations

- Spending by category (Pie Chart)
- Income vs. Expense summary (Bar Chart)
- Expenses over time (Line Chart)

---

## ✅ License

This project is licensed under the MIT License.