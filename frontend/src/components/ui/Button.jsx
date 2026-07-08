function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  let buttonStyle = "";

  if (variant === "primary") {
    buttonStyle =
      "bg-red-600 hover:bg-red-500 text-white shadow-lg";
  } else if (variant === "secondary") {
    buttonStyle =
      "border border-white text-white hover:bg-white hover:text-red-600";
  } else {
    buttonStyle =
      "bg-[#181818] text-white hover:bg-[#222]";
  }

  return (
    <button
      className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${buttonStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;