export default function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-[#111111] rounded-2xl p-6 border border-gray-800 hover:border-red-500 transition">

      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold mt-2 ${color}`}
      >
        {value}
      </h2>

    </div>
  );
}