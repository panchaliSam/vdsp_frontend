import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "@app_api/User.API";
import { clearTokens, getRefreshToken } from "@app_api/helper/TokenHelper";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        console.warn("No refresh token found. Redirecting to login.");
        clearTokens();
        navigate("/");
        return;
      }
      await logout();
      clearTokens();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        className="flex flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <AlertTriangle size={96} className="text-red-500" />
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg text-gray-400">
          Oops! The page you're looking for doesn't exist.
        </p>
        <motion.button
          className="px-6 py-2 mt-4 font-medium text-gray-900 bg-white rounded-full shadow-lg hover:bg-gray-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleGoHome}
        >
          Go Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
