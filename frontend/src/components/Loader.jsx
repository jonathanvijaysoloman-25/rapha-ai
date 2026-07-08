import { FaHeartbeat } from "react-icons/fa";

function Loader() {
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
      <div className="flex flex-col items-center">

        <FaHeartbeat
          className="text-red-500 animate-pulse"
          size={70}
        />

        <h2 className="text-white text-2xl font-bold mt-5">
          Rapha AI
        </h2>

        <p className="text-gray-400 mt-2">
          Loading...
        </p>

      </div>
    </div>
  );
}

export default Loader;