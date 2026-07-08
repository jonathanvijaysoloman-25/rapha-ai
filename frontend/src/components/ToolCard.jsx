import { Link } from "react-router-dom";

export default function ToolCard({
  title,
  subtitle,
  icon,
  path,
}) {
  return (
    <Link
      to={path}
      className="bg-[#111111] rounded-2xl border border-gray-800 p-6 hover:border-red-500 transition"
    >
      <div className="text-red-500 text-3xl mb-4">
        {icon}
      </div>

      <h2 className="text-white text-lg font-semibold">
        {title}
      </h2>

      <p className="text-gray-400 mt-2 text-sm">
        {subtitle}
      </p>
    </Link>
  );
}