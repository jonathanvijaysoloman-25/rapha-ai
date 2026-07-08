import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0b0606] text-white overflow-hidden">

      {/* Mobile Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-50 lg:hidden bg-red-700 p-3 rounded-xl shadow-xl"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static
        top-0 left-0
        h-full
        z-50
        transition-transform
        duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
        `}
      >
        <div className="relative">

          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 lg:hidden bg-red-700 rounded-lg p-2"
          >
            <X size={20} />
          </button>

          <Sidebar closeSidebar={() => setOpen(false)} />

        </div>
      </div>

      {/* Main Content */}
      <main
        className="
        flex-1
        overflow-y-auto
        p-5
        md:p-8

        bg-gradient-to-br
        from-[#090303]
        via-[#120606]
        to-[#1a0808]

        relative
        "
      >

        <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-red-700/10 blur-[140px]" />

        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-red-900/10 blur-[130px]" />

        <div className="relative z-10">
          <Outlet />
        </div>

      </main>

    </div>
  );
}