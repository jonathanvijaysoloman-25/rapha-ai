import { FaHeartbeat } from "react-icons/fa";

function WelcomeBanner() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-10">

      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative flex flex-col lg:flex-row justify-between items-center gap-8">

        <div>
          <h2 className="text-5xl font-bold text-white">
            {greeting} 👋
          </h2>

          <h1 className="text-3xl mt-4 font-semibold text-white">
            Welcome to Rapha AI
          </h1>

          <p className="text-red-100 mt-4 max-w-xl leading-8">
            Your intelligent healthcare companion. Analyze reports,
            check symptoms, understand prescriptions and find nearby doctors.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="px-6 py-3 rounded-2xl bg-white text-red-600 font-semibold hover:bg-gray-200 transition">
              Start Diagnosis
            </button>

            <button className="px-6 py-3 rounded-2xl border border-white text-white hover:bg-white hover:text-red-600 transition">
              Upload Report
            </button>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="w-44 h-44 rounded-full bg-white/10 flex items-center justify-center">
            <FaHeartbeat className="text-white animate-pulse" size={90} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default WelcomeBanner;