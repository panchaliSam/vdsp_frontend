import React from "react";
import LoginSection from "@app_components/LoginSection";
import HeroSectionImage from "@app_assets/HeroSection/HeroSection.jpg";

const LoginPage: React.FC = () => {
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
      <div className="w-full flex justify-center items-start mt-[-100px]">
        <LoginSection />
      </div>
    </div>
  );
};

export default LoginPage;
