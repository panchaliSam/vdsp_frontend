import React from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-black via-gray-800 to-black text-white">
      <motion.div
        className="text-white"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Loader size={64} />
      </motion.div>
    </div>
  );
};

export default LoadingPage;
