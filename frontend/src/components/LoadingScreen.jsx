import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#090202] via-[#160606] to-[#2a0909]">

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
        }}
        className="p-6 rounded-full bg-gradient-to-br from-red-700 to-red-500 shadow-[0_0_60px_rgba(239,68,68,.6)]"
      >
        <HeartPulse size={70} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
        className="text-5xl font-black mt-8 bg-gradient-to-r from-red-300 via-red-500 to-red-400 bg-clip-text text-transparent"
      >
        Rapha AI
      </motion.h1>

      <p className="text-gray-400 mt-4 text-lg">
        AI Powered Healthcare Assistant
      </p>

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
          ease: "linear",
        }}
        className="mt-10 w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full"
      />

    </div>
  );
}