import {
  LayoutDashboard,
  FileText,
  Pill,
  Activity,
  Calculator,
  MapPin,
  MessageCircle,
  LogOut,
  Heart,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menus = [
    { name: "Home", icon: LayoutDashboard, path: "/" },
    { name: "Medical Report Analysis", icon: FileText, path: "/medical-report" },
    { name: "Know About A Medicine", icon: Pill, path: "/prescription" },
    { name: "Symptoms Checker", icon: Activity, path: "/symptom-checker" },
    { name: "BMI Calculator", icon: Calculator, path: "/bmi" },
    { name: "Nearby Hospitals ", icon: MapPin, path: "/nearby-hospitals" },
    { name: "Nearest Pharmacy & Diagnostics", icon: MapPin, path: "/pharmacies" },
    { name: "AI Health Chat", icon: MessageCircle, path: "/health-chat" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="w-80 min-h-screen bg-gradient-to-b from-[#120404] via-[#1a0707] to-[#080303] border-r border-red-900/30 backdrop-blur-xl flex flex-col shadow-[0_0_50px_rgba(80,0,0,.35)]">

      {/* Logo */}

      <div className="px-7 pt-8 pb-6 border-b border-red-900/30">

        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="flex items-center gap-3"
        >
          <motion.div
            animate={{
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
            className="bg-gradient-to-br from-red-700 to-red-500 p-3 rounded-2xl shadow-[0_0_30px_rgba(239,68,68,.45)]"
          >
            <Heart size={26} />
          </motion.div>

          <div>

            <h1 className="text-3xl font-black bg-gradient-to-r from-red-300 via-red-500 to-red-400 bg-clip-text text-transparent">
              Rapha AI
            </h1>

            <p className="text-gray-400 text-sm">
              AI Healthcare Assistant
            </p>

          </div>

        </motion.div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-2">

        {menus.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.05,
              }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-red-800 via-red-700 to-red-600 text-white shadow-[0_0_25px_rgba(239,68,68,.45)]"
                      : "text-gray-300 hover:bg-gradient-to-r hover:from-[#2b0b0b] hover:to-[#180707] hover:text-white hover:translate-x-2"
                  }`
                }
              >
                <motion.div
                  whileHover={{
                    rotate: 10,
                    scale: 1.15,
                  }}
                >
                  <Icon size={21} />
                </motion.div>

                <span className="font-medium">
                  {item.name}
                </span>
              </NavLink>
            </motion.div>
          );
        })}

      </nav>

      {/* Footer */}

      <div className="p-6 border-t border-red-900/30">

        <div className="rounded-2xl bg-gradient-to-r from-[#210909] to-[#120505] border border-red-900/30 p-4 mb-5">

          <p className="text-sm text-gray-400">
            Logged in as
          </p>

          <h3 className="font-bold text-white mt-1">
            Healthcare User
          </h3>

          <div className="flex items-center gap-2 mt-3">

            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

            <span className="text-green-400 text-sm">
              Online
            </span>

          </div>

        </div>

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 py-4 font-semibold shadow-lg hover:shadow-[0_0_35px_rgba(239,68,68,.5)] transition-all"
        >
          <LogOut size={20} />

          Sign Out

        </motion.button>

      </div>

    </aside>
  );
}