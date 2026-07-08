import logo from "../assets/logo.png";
import { Bell, UserCircle } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800 bg-[#050505]">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="Rapha AI"
          className="w-10 h-10"
        />

        <div>
          <h1 className="text-white text-2xl font-bold">
            Rapha AI
          </h1>
          <p className="text-gray-400 text-sm">
            AI Healthcare Platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="text-gray-300 hover:text-red-500">
          <Bell size={22} />
        </button>

        <button className="text-gray-300 hover:text-red-500">
          <UserCircle size={30} />
        </button>
      </div>
    </div>
  );
}