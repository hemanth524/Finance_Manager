import { useState, useRef } from "react";
import API from "../api";
import { Upload, Loader2, FileText } from "lucide-react";

const TransactionPDFUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) { setError("Please select a PDF file first."); return; }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      setError(null);
      const token = localStorage.getItem("token");
      const res = await API.post("/transactions/pdf/upload-pdf", formData, { headers: { "Content-Type":"multipart/form-data", Authorization:`Bearer ${token}` }});
      if (onUploadSuccess) onUploadSuccess(res.data.transactions);
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to process PDF. Please try again.");
    } finally { setIsUploading(false); }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-gray-600 p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6" /> Upload Transaction PDF
      </h2>

      <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      <div className="flex gap-3">
        <button onClick={()=>fileInputRef.current.click()} className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"><Upload className="w-5 h-5" /> Choose File</button>
        <button onClick={handleUpload} disabled={!file || isUploading} className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50">
          {isUploading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <>Upload</>}
        </button>
      </div>

      {file && <p className="mt-2 text-sm text-white">Selected: {file.name}</p>}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default TransactionPDFUpload;
