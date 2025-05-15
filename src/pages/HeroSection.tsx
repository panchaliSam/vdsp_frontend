import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import HeroSectionImage from "@app_assets/HeroSection/HeroSection.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSignIn = () => navigate("/login");
  const handleGallery = () => navigate("/gallery");

  return (
    <div
      className="relative w-full h-screen text-white font-urbanist overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0.7), rgba(0, 0, 0, 0.85)), url(${HeroSectionImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-5 z-20 backdrop-blur-sm">
        <img src={Logo} alt="Logo" className="h-12 lg:h-14" />
        <button
          onClick={handleSignIn}
          className="text-white font-medium px-5 py-2 hover:text-yellow-400 transition-all duration-200"
        >
          Sign In
        </button>
      </div>

      {/* Centered Hero Content */}
      <div className="flex items-center justify-center h-full z-10 relative px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex justify-center"
          >
            <img src={Logo} alt="Vidua De Silva Photography" className="h-28 md:h-32" />
          </motion.div>
          <div className="text-3xl md:text-5xl mb-4 leading-snug italic">
            Capturing Stories in Every Frame
          </div>

          <p className="text-lg md:text-xl font-light mb-8 px-2">
            Welcome to <span className="text-yellow-400 font-medium">Vidua De Silva Photography</span>, a professional studio in the heart of <strong>Homagama</strong>. We specialize in weddings, portraits, and lifestyle sessions turning life’s moments into everlasting memories.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGallery}
              className="text-white border border-yellow-400 font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-yellow-400 hover:text-black"
            >
              View Gallery
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition duration-300 hover:bg-yellow-300"
            >
              Book a Session
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;