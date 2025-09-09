import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ReceiptUpload = ({ onUploadSuccess, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post("/receipts/process-ai", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      onUploadSuccess(data);
      toast.success("Receipt processed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to process receipt.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
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
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-purple-400 focus:outline-none"
        } ${isDragging ? "border-purple-400 scale-105" : "border-gray-500"}`}
      >
        <div className="flex flex-col items-center">
          <UploadIcon />
          <span className="font-medium text-gray-300">
            {fileName
              ? fileName
              : isProcessing
              ? "Processing..."
              : <>Drop receipt, or <span className="text-purple-400 underline">browse</span></>}
          </span>
        </div>
        <input
          id="receipt-upload"
          type="file"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files[0])}
          disabled={disabled || isProcessing}
        />
      </label>
    </div>
  );
};

export default ReceiptUpload;
