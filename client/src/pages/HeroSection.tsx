import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import HeroSectionImage from "@app_assets/HeroSection/HeroSection.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div
      className="relative w-full h-screen text-white flex items-center overflow-hidden font-urbanist px-4 md:px-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.7), rgba(0, 0, 0, 0.7)), url(${HeroSectionImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="container mx-auto px-6 lg:px-0 flex flex-col-reverse lg:flex-row items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-center lg:text-left max-w-xl z-10 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, bounce: 0.5 }}
            className="mb-6 flex justify-center lg:justify-start mt-12"
          >
            <img src={Logo} alt="Company Logo" className="h-48 lg:h-40" />
          </motion.div>
          <p className="text-lg lg:text-xl mb-6 font-light text-center">
            Capturing moments through the lens, where every image speaks
            volumes.
          </p>
          <motion.div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="bg-white text-black font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
