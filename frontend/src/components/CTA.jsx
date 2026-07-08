import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function CTA() {
  return (
    <section className="bg-[#080808] py-28 px-8">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-red-900 to-red-700 p-14 text-center shadow-[0_0_60px_rgba(239,68,68,0.25)]"
      >
        <h2 className="text-5xl font-bold text-white">
          Your Health Deserves Intelligent Care
        </h2>

        <p className="text-gray-200 mt-6 text-xl max-w-3xl mx-auto leading-9">
          Analyze symptoms, understand medical reports, decode prescriptions,
          find nearby doctors, and manage your medicines — all in one AI-powered platform.
        </p>

        <button className="mt-10 bg-white text-red-700 px-10 py-4 rounded-xl font-bold flex items-center gap-3 mx-auto hover:scale-105 transition">
          Get Started
          <FaArrowRight />
        </button>
      </motion.div>
    </section>
  );
}

export default CTA;