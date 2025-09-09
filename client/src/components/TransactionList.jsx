import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';

// --- API PLACEHOLDER ---
// IMPORTANT: This is a placeholder for your actual API client.
// Please delete this entire object and uncomment the line below to import your API.
import API from '../api';

// --- ICONS ---
const LoadingSpinner = ({ className }) => (<svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const ChevronLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>);
const EmptyBoxIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 text-gray-500"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>);
// --- NEW ICONS ---
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);

// --- NEW EDIT TRANSACTION MODAL COMPONENT ---
const EditTransactionModal = ({ transaction, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        ...transaction,
        // Format date for the input type="date" which requires YYYY-MM-DD
        date: new Date(transaction.date).toISOString().split('T')[0]
    });

    useEffect(() => {
        setFormData({
            ...transaction,
            date: new Date(transaction.date).toISOString().split('T')[0]
        });
    }, [transaction]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSave = {
            ...formData,
            amount: parseFloat(formData.amount)
        };
        onSave(dataToSave);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: -20 }}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold mb-4">Edit Transaction</h2>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition"><CloseIcon /></button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Amount</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white [color-scheme:dark]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white [color-scheme:dark]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white [color-scheme:dark]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white [color-scheme:dark]"></textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-lg transition">Save Changes</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};


// --- TRANSACTION LIST COMPONENT ---
const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const limit = 10;

    // --- NEW STATE for modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const fetchTransactions = useCallback(async (pageNum, filterDates) => {
        setIsLoading(true);
        try {
            let query = `?page=${pageNum}&limit=${limit}`;
            if (filterDates && filterDates.from && filterDates.to) {
                query += `&from=${filterDates.from}&to=${filterDates.to}`;
            }
            const { data } = await API.get(`/transactions${query}`);
            setTransactions(data.transactions);
            setPages(data.pages);
            setPage(data.page);
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to fetch transactions");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransactions(page, { from: fromDate, to: toDate });
    }, [page, fetchTransactions]);

    const handleFilter = () => {
        if (!fromDate || !toDate) {
            toast.warn("Please select both From and To dates");
            return;
        }
        setPage(1);
        fetchTransactions(1, { from: fromDate, to: toDate });
    };

    const handleReset = () => {
        setFromDate("");
        setToDate("");
        setPage(1);
        fetchTransactions(1, {});
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                await API.delete(`/transactions/${id}`);
                toast.success("Transaction deleted successfully!");
                fetchTransactions(page, { from: fromDate, to: toDate });
            } catch (err) {
                toast.error(err.response?.data?.error || "Failed to delete transaction");
            }
        }
    };
    
    const handleUpdate = async (updatedData) => {
        if (!editingTransaction) return;
        try {
            await API.put(`/transactions/${editingTransaction._id}`, updatedData);
            toast.success("Transaction updated successfully!");
            setIsModalOpen(false);
            setEditingTransaction(null);
            // Refresh data after update
            fetchTransactions(page, { from: fromDate, to: toDate });
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to update transaction");
        }
    };

    const handleOpenModal = (transaction) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full max-w-5xl">
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
                <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white [color-scheme:dark]" />
                <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-white [color-scheme:dark]" />
                <button onClick={handleFilter} className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 whitespace-nowrap">Apply</button>
                <button onClick={handleReset} className="w-full sm:w-auto px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-all">Reset</button>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                {isLoading ? (
                    <div className="h-96 flex items-center justify-center"><LoadingSpinner className="w-12 h-12 text-purple-400" /></div>
                ) : transactions.length === 0 ? (
                    <div className="h-96 flex flex-col items-center justify-center text-center p-4">
                        <EmptyBoxIcon />
                        <h3 className="mt-4 text-xl font-semibold">No Transactions Found</h3>
                        <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-300">
                            {/* --- MODIFIED THEAD --- */}
                            <thead className="text-xs text-gray-400 uppercase bg-white/5">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Type</th>
                                    <th scope="col" className="px-6 py-3">Category</th>
                                    <th scope="col" className="px-6 py-3">Amount</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((t) => (
                                    <tr key={t._id} className="border-b border-gray-700 hover:bg-white/5 transition">
                                        <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${t.type === 'income' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{t.type}</span></td>
                                        <td className="px-6 py-4">{t.category}</td>
                                        <td className={`px-6 py-4 font-semibold ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>{t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">{new Date(t.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 truncate max-w-xs">{t.description}</td>
                                        {/* --- NEW ACTIONS CELL --- */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <button onClick={() => handleOpenModal(t)} className="text-blue-400 hover:text-blue-300 hover:cursor-pointer transition" title="Edit"><EditIcon /></button>
                                                <button onClick={() => handleDelete(t._id)} className="text-red-400 hover:text-red-300 hover:cursor-pointer transition" title="Delete"><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {pages > 1 && (
                    <div className="p-4 flex justify-center items-center gap-4 text-sm">
                        <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="p-2 rounded-md hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"><ChevronLeftIcon /></button>
                        <span>Page {page} of {pages}</span>
                        <button onClick={() => setPage(page + 1)} disabled={page >= pages} className="p-2 rounded-md hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition"><ChevronRightIcon /></button>
                    </div>
                )}
            </div>
            {/* --- NEW MODAL RENDER --- */}
            <AnimatePresence>
                {isModalOpen && editingTransaction && (
                    <EditTransactionModal 
                        transaction={editingTransaction} 
                        onClose={() => setIsModalOpen(false)} 
                        onSave={handleUpdate} 
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};


// --- MAIN APP / PAGE COMPONENT (Unchanged) ---
const App = () => {
    useEffect(() => {
        const toastifyCssId = 'react-toastify-css';
        if (!document.getElementById(toastifyCssId)) {
            const link = document.createElement('link');
            link.id = toastifyCssId;
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css';
            document.head.appendChild(link);
        }
    }, []);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 sm:p-8 bg-gray-900 bg-gradient-to-br from-gray-900 via-purple-900/60 to-gray-900 text-white font-sans overflow-y-auto">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-500/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="z-10 w-full max-w-5xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white">Transaction History</h1>
                    <p className="text-gray-400 mt-2">View and filter your past transactions.</p>
                </div>

                <main className="flex justify-center">
                    <TransactionList />
                </main>
            </div>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        </div>
    );
};

export default App;