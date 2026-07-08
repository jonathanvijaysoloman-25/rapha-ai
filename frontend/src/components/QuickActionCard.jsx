import { Link } from "react-router-dom";

export default function QuickActionCard({
  title,
  description,
  icon,
  path,
}) {
  return (
    <Link
      to={path}
      className="bg-[#111111] border border-gray-800 rounded-2xl p-6 hover:border-red-500 hover:-translate-y-1 transition duration-300"
    >
      <div className="text-red-500 text-3xl mb-4">
        {icon}
      </div>

      <h2 className="text-white text-lg font-semibold">
        {title}
      </h2>

      <p className="text-gray-400 mt-2 text-sm">
        {description}
      </p>
    </Link>
  );
}