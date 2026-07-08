import { FaCapsules } from "react-icons/fa";

function MedicineReminder() {
  return (
    <div className="bg-[#111111] border border-red-900/30 rounded-3xl p-6">

      <div className="flex items-center gap-3 mb-5">
        <FaCapsules className="text-red-500 text-2xl" />
        <h2 className="text-2xl font-bold text-white">
          Today's Medicines
        </h2>
      </div>

      <div className="bg-[#181818] rounded-2xl p-5">
        <p className="text-gray-400">
          No medicine reminders available.
        </p>

        <button className="mt-5 bg-red-600 hover:bg-red-500 px-5 py-2 rounded-xl text-white font-semibold transition">
          + Add Reminder
        </button>
      </div>

    </div>
  );
}

export default MedicineReminder;