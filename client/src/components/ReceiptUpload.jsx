import React, { useState } from "react";
import API from "../api"; // Custom API module
import { toast } from "react-toastify"; // Toast notifications

// Simple SVG component for upload icon
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 text-gray-400"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /> {/* Bottom rectangle */}
    <polyline points="17 8 12 3 7 8" /> {/* Up arrow */}
    <line x1="12" y1="3" x2="12" y2="15" /> {/* Vertical line */}
  </svg>
);

// --- START: NEW SPINNER COMPONENT ---
// Simple SVG spinner component
const Spinner = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 animate-spin text-purple-400"
  >
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);
// --- END: NEW SPINNER COMPONENT ---

const ReceiptUpload = ({ onUploadSuccess, disabled }) => {
  const [isDragging, setIsDragging] = useState(false); // Highlight border when dragging
  const [fileName, setFileName] = useState(""); // Name of selected file
  const [isProcessing, setIsProcessing] = useState(false); // Loading state during API call

  // Handle file selection (either via input or drop)
  const handleFileChange = async (file) => {
    if (!file) return;

    setFileName(file.name); // Save file name to state
    setIsProcessing(true); // Show processing state

    const formData = new FormData();
    formData.append("file", file); // Append file to FormData

    try {
      const token = localStorage.getItem("token"); // Get auth token
      // POST request to backend to process receipt using AI
      const { data } = await API.post("/receipts/process-ai", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      onUploadSuccess(data); // Callback to parent component
      toast.success("Receipt processed successfully!"); // Success toast
    } catch (err) {
      console.error(err);
      toast.error("Failed to process receipt."); // Error toast
    } finally {
      setIsProcessing(false); // Reset processing state
      setFileName(""); // Clear file name after processing
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isProcessing) return;
    setIsDragging(true); // Highlight border
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false); // Remove highlight
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || isProcessing) return;
    setIsDragging(false); // Remove highlight

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]); // Process dropped file
      e.dataTransfer.clearData(); // Clear drag data
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor="receipt-upload"
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-32 px-4 transition bg-white/5 border-2 border-dashed rounded-xl appearance-none ${
          disabled || isProcessing // <-- Disable while processing
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-purple-400 focus:outline-none"
        } ${isDragging ? "border-purple-400 scale-105" : "border-gray-500"}`}
      >
        <div className="flex flex-col items-center">
          {/* --- START: CONDITIONAL RENDERING --- */}
          {/* 2. Show spinner when processing, otherwise show the icon */}
          {isProcessing ? <Spinner /> : <UploadIcon />}
          {/* --- END: CONDITIONAL RENDERING --- */}

          <span className="font-medium text-gray-300 mt-2">
            {isProcessing
              ? "Processing..." // Show processing text
              : fileName
              ? fileName // Show selected file name
              : (
                <>Drop receipt, or <span className="text-purple-400 underline">browse</span></> // Default instructions
              )}
          </span>
        </div>

        {/* Hidden file input for browsing */}
        <input
          id="receipt-upload"
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
          disabled={disabled || isProcessing} // Disable input if uploading
        />
      </label>
    </div>
  );
};

export default ReceiptUpload;