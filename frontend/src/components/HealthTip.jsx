import { HeartPulse } from "lucide-react";

export default function HealthTip() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8">

      <div className="flex items-center gap-3">

        <HeartPulse size={30} className="text-white" />

        <h2 className="text-2xl text-white font-bold">
          Daily Health Tip
        </h2>

      </div>

      <p className="text-red-100 mt-4 leading-7">
        Drink plenty of water, eat fresh fruits,
        exercise for at least 30 minutes,
        and get 7–8 hours of quality sleep.
        Small healthy habits every day lead
        to a healthier future.
      </p>

    </div>
  );
}