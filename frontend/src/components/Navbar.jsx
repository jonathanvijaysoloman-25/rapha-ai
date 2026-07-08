import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-red-900/40"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-4">

          <img
            src={logo}
            alt="Rapha AI Logo"
            className="w-14 h-14 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold text-white tracking-wide">
              Rapha <span className="text-red-500">AI</span>
            </h1>

            <p className="text-sm text-gray-400">
              Intelligent Healthcare Assistant
            </p>
          </div>

        </a>

        {/* Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-gray-300 font-medium">

          <a href="#" className="hover:text-red-500 transition duration-300">
            Home
          </a>

          <a href="#features" className="hover:text-red-500 transition duration-300">
            Features
          </a>

          <a href="#about" className="hover:text-red-500 transition duration-300">
            About
          </a>

          <a href="#contact" className="hover:text-red-500 transition duration-300">
            Contact
          </a>

        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">

          <button
            className="px-6 py-2 border border-red-500 rounded-full text-red-400 hover:bg-red-600 hover:text-white transition duration-300"
          >
            Login
          </button>

          <button
            className="px-6 py-2 rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300"
          >
            Get Started
          </button>

        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;