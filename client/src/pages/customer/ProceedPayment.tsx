import React from "react";
import { CssBaseline } from "@mui/material";
import PayHereForm from "@app_components/customer/Reservations/PayHereForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CustomerProceedPayment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white relative">
      <CssBaseline />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
        aria-label="Go back to the previous page"
      >
        <ArrowLeft size={24} />
      </button>

      <PayHereForm />
    </div>
  );
};
