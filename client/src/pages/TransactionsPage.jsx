import TransactionList from "../components/TransactionList";
import TransactionPDFUpload from "../components/TransactionPDFUpload";
import { useState } from "react";

const TransactionsPage = () => {
  const [newTransactions, setNewTransactions] = useState([]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* PDF Upload Section */}
        <section>
          <TransactionPDFUpload onUploadSuccess={setNewTransactions} />
        </section>

        {/* Transaction History Section */}
        <section>
          <TransactionList newTransactions={newTransactions} />
        </section>
      </div>
    </div>
  );
};

export default TransactionsPage;
