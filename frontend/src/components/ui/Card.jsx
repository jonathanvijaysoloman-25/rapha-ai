function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-[#111111] rounded-3xl border border-red-900/30 p-6 hover:border-red-500 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;