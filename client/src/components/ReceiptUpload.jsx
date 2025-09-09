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
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
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
    if (disabled) return;
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
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-purple-400 focus:outline-none"
        } ${isDragging ? "border-purple-400 scale-105" : "border-gray-500"}`}
      >
        <div className="flex flex-col items-center">
          <UploadIcon /> {/* Upload icon */}
          <span className="font-medium text-gray-300">
            {fileName
              ? fileName // Show selected file name
              : isProcessing
              ? "Processing..." // Show processing text
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
