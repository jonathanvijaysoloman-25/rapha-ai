function StatusBadge({ text }) {
  return (
    <span className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium">
      {text}
    </span>
  );
}

export default StatusBadge;