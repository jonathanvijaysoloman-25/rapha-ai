import {
  FileText,
  Pill,
  Activity,
  Calculator,
  MapPin,
  MessageCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const quickActions = [
    {
      title: "Medical Report",
      icon: FileText,
      link: "/medical-report",
    },
    {
      title: "Prescription",
      icon: Pill,
      link: "/prescription",
    },
    {
      title: "Symptom Checker",
      icon: Activity,
      link: "/symptom-checker",
    },
    {
      title: "BMI Calculator",
      icon: Calculator,
      link: "/bmi",
    },
    {
      title: "Nearby Hospitals",
      icon: MapPin,
      link: "/nearby-hospitals",
    },
    {
      title: "AI Health Chat",
      icon: MessageCircle,
      link: "/health-chat",
    },
  ];

  return (
    <div className="relative space-y-10 overflow-hidden">

      {/* Background Glow */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-red-700/20 blur-[140px]"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-red-900/20 blur-[150px]"
      />

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .8 }}
        className="relative overflow-hidden rounded-3xl border border-red-900/40 bg-gradient-to-br from-[#180505] via-[#240808] to-[#120404] p-8 lg:p-12 shadow-2xl"
      >

        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-red-500/10" />

        <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

          <div className="max-w-2xl">

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .3 }}
              className="uppercase tracking-[6px] text-red-400 font-semibold"
            >
              AI Powered Healthcare
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .4 }}
              className="mt-5 text-5xl md:text-6xl xl:text-7xl font-black leading-tight"
            >
              Welcome to
              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-rose-300 bg-clip-text text-transparent">
                Rapha AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .7 }}
              className="mt-6 text-gray-300 text-lg leading-8"
            >
              Your intelligent healthcare companion.
              Analyze reports, understand prescriptions,
              detect symptoms, calculate BMI,
              locate nearby hospitals and pharmacies,
              and chat with AI instantly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: .9 }}
              className="mt-10 flex flex-wrap gap-4"
            >

              <Link
                to="/health-chat"
                className="rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-7 py-3 font-semibold shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(239,68,68,.55)]"
              >
                AI Health Chat
              </Link>

              <Link
                to="/medical-report"
                className="rounded-xl border border-red-700 bg-white/5 px-7 py-3 font-semibold backdrop-blur transition duration-300 hover:bg-red-900/30"
              >
                Analyze Report
              </Link>

            </motion.div>

          </div>

          <motion.img
            src={logo}
            alt="Rapha AI"
            className="w-56 lg:w-72 drop-shadow-[0_0_45px_rgba(239,68,68,.6)]"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.03, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

        </div>

      </motion.section>

      {/* Quick Actions */}

      <section>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-3xl font-bold"
        >
          Quick Actions
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

          {quickActions.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
              >

                <Link
                  to={item.link}
                  className="group block rounded-3xl border border-red-900/40 bg-gradient-to-br from-[#160606]/90 to-[#0b0505]/90 backdrop-blur-xl p-6 transition duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_40px_rgba(220,38,38,.25)]"
                >

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-800 to-red-500 transition duration-300 group-hover:rotate-6 group-hover:scale-110">

                    <Icon size={30} />

                  </div>

                  <h3 className="text-xl font-bold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-gray-400">
                    Open {item.title}
                  </p>

                </Link>

              </motion.div>

            );

          })}

        </div>

      </section>

      {/* Health Tip */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-red-900/40 bg-gradient-to-r from-[#180606] via-[#240808] to-[#180606] p-8 shadow-xl"
      >

        <h2 className="text-2xl font-bold text-red-400">
          ❤️ Today's Health Tip
        </h2>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          Drink enough water, eat a balanced diet,
          sleep at least 7–8 hours every night,
          exercise regularly,
          and never ignore persistent symptoms.
          AI can assist you,
          but professional medical advice should always come first.
        </p>

      </motion.section>

    </div>
  );
}