function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
  className = "",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800",

    secondary:
      "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100",

    success:
      "bg-green-600 text-white hover:bg-green-700",

    danger:
      "bg-red-600 text-white hover:bg-red-700",

    warning:
      "bg-orange-500 text-white hover:bg-orange-600",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={`
        px-5
        py-2.5
        rounded-xl
        font-medium
        transition-all
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant] || variants.primary}
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-2">
        {children}
      </div>
    </button>
  );
}

export default Button;