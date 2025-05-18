import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "@app_assets/logo/svg/logo-no-background.svg";
import HeroSectionImage from "@app_assets/HeroSection/HeroSection.jpg";
import ParallaxAlbumShowcase from '../components/ParallaxAlbumShowcase';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSignIn = () => navigate("/login");
  const handleGallery = () => navigate("/gallery");

  return (
    <div className="relative w-full h-screen font-urbanist flex flex-col justify-between overflow-hidden">
      {/* Background image and overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HeroSectionImage}
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Navbar */}
      <div className="relative z-20 flex justify-between items-center px-8 pt-8">
        <img src={Logo} alt="Logo" className="h-14 drop-shadow-lg" />
        <button
          onClick={handleSignIn}
          className="text-white font-medium px-6 py-2 rounded-full hover:text-yellow-400 transition-all duration-200 bg-black/30 backdrop-blur-md"
        >
          Sign In
        </button>
      </div>

      {/* Parallax Showcase */}
      <div className="relative z-20 flex justify-center mt-8 md:mt-12 px-2 md:px-0">
        <ParallaxAlbumShowcase />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 px-4 md:px-8 mt-4 md:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-2xl"
        >
          <div className="text-4xl md:text-5xl font-bold italic mb-6 text-white drop-shadow-lg">
            "Capturing Stories in Every Frame"
          </div>

          <p className="text-xl md:text-2xl font-light mb-6 px-2 text-gray-200 drop-shadow">
            Welcome to <span className="text-yellow-400 font-semibold">Vidua De Silva Photography</span>, a professional studio.
          </p>

          <p className="text-lg md:text-xl font-light mb-10 px-2 text-gray-300">
            We specialize in weddings, portraits, and lifestyle sessions turning life's moments into everlasting memories.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGallery}
              className="text-white border-2 border-yellow-400 font-semibold px-8 py-3 rounded-full transition duration-300 hover:bg-yellow-400 hover:text-black shadow-lg bg-black/40 backdrop-blur-md"
            >
              View Gallery
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-full transition duration-300 hover:bg-yellow-300 shadow-lg"
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