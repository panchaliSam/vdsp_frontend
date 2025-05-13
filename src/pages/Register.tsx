import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RegisterSection from "@app_components/RegisterSection";
import HeroSectionImage from "@app_assets/HeroSection/HeroSection.jpg";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen text-white flex items-center overflow-hidden font-urbanist px-4 md:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.8), rgba(0, 0, 0, 0.9)), url(${HeroSectionImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
        aria-label="Go back to home"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="w-full flex justify-center items-start mt-[-100px]">
        <RegisterSection />
      </div>
    </div>
  );
};

export default RegisterPage;
