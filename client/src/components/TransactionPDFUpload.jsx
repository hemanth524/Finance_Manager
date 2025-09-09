import { useState, useRef } from "react";
import API from "../api";
import { Upload, Loader2, FileText } from "lucide-react";

const TransactionPDFUpload = ({ onUploadSuccess }) => {
  // --- Local state hooks ---
  const [file, setFile] = useState(null);            // Stores selected file
  const [isUploading, setIsUploading] = useState(false); // Loading state while uploading
  const [error, setError] = useState(null);          // Error message if upload fails
  const fileInputRef = useRef(null);                 // Ref to hidden file input

  // --- Handles file selection ---
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // --- Handles PDF upload ---
  const handleUpload = async () => {
    if (!file) { 
      setError("Please select a PDF file first."); 
      return; 
    }

    const formData = new FormData();
    formData.append("file", file); // Add file to FormData

    try {
      setIsUploading(true);   // Show loading state
      setError(null);         // Reset error if any

      // Get token for authentication
      const token = localStorage.getItem("token");

      // Call backend API to process PDF
      const res = await API.post("/transactions/pdf/upload-pdf", formData, { 
        headers: { 
          "Content-Type": "multipart/form-data", 
          Authorization: `Bearer ${token}` 
        } 
      });

      // Pass extracted transactions back to parent component
      if (onUploadSuccess) onUploadSuccess(res.data.transactions);

      // Reset file input
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.error || "Failed to process PDF. Please try again.");
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-gray-600 p-6 rounded-2xl shadow-md mb-6">
      {/* Title Section */}
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FileText className="w-6 h-6" /> Upload Transaction PDF
      </h2>

      {/* Hidden input for selecting file */}
      <input 
        type="file" 
        accept="application/pdf" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
      />

      {/* File buttons */}
      <div className="flex gap-3">
        {/* Choose File button triggers hidden input */}
        <button 
          onClick={() => fileInputRef.current.click()} 
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
        >
          <Upload className="w-5 h-5" /> Choose File
        </button>

        {/* Upload button */}
        <button 
          onClick={handleUpload} 
          disabled={!file || isUploading} 
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
        >
          {/* Show spinner if uploading */}
          {isUploading 
            ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> 
            : <>Upload</>
          }
        </button>
      </div>

      {/* File name preview */}
      {file && <p className="mt-2 text-sm text-white">Selected: {file.name}</p>}

      {/* Error message */}
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default TransactionPDFUpload;
