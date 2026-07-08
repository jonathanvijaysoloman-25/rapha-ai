import StatCard from "./StatCard";

export default function Stats() {

  return (

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      <StatCard
        title="Medical Reports"
        value="12"
        color="text-red-500"
      />

      <StatCard
        title="Prescriptions"
        value="8"
        color="text-green-400"
      />

      <StatCard
        title="BMI Calculations"
        value="18"
        color="text-blue-400"
      />

      <StatCard
        title="Nearby Hospitals"
        value="24"
        color="text-yellow-400"
      />

    </div>

  );
}