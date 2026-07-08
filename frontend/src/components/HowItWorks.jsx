import { motion } from "framer-motion";
import {
  FaUserMd,
  FaRobot,
  FaFileMedical,
  FaHeartbeat,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaHeartbeat size={40} />,
    title: "Describe Your Health",
    description:
      "Tell Rapha AI about your symptoms or upload your medical report.",
  },
  {
    icon: <FaRobot size={40} />,
    title: "AI Analysis",
    description:
      "Our AI understands your symptoms, prescriptions and reports within seconds.",
  },
  {
    icon: <FaFileMedical size={40} />,
    title: "Get Smart Insights",
    description:
      "Receive simple explanations, medicine guidance and personalized recommendations.",
  },
  {
    icon: <FaUserMd size={40} />,
    title: "Consult a Doctor",
    description:
      "Locate nearby hospitals and specialists whenever professional care is needed.",
  },
];

function HowItWorks() {
  return (
    <section
      id="about"
      className="bg-[#080808] py-28 px-8"
    >
      <div className="max-w-7xl mx-auto">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center text-white"
        >
          How Rapha AI Works
        </motion.h2>

        <p className="text-center text-gray-400 mt-5 max-w-3xl mx-auto text-lg">
          From understanding symptoms to finding the right healthcare,
          Rapha AI simplifies your entire health journey.
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mt-20">

          {steps.map((step, index) => (

            <motion.div
              key={index}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="relative bg-[#111111] border border-red-900/40 rounded-3xl p-8 text-center hover:border-red-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all"
            >

              <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center text-white mx-auto mb-6">
                {step.icon}
              </div>

              <div className="absolute -top-4 left-6 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                Step {index + 1}
              </div>

              <h3 className="text-2xl text-white font-bold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-400 leading-8">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;