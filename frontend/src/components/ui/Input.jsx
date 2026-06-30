import clsx from "clsx";

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  onClick,
}) {
  const variants = {
    primary:
      "bg-neutral-900 text-white hover:bg-neutral-800 focus:ring-neutral-900",

    secondary:
      "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-300",

    outline:
      "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",

    ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100",

    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading...
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
}

export default Button;
