import clsx from "clsx";

function Badge({ children, variant = "default", size = "md" }) {
  const variants = {
    default: "bg-neutral-100 text-neutral-800",

    primary: "bg-neutral-900 text-white",

    accent: "bg-amber-500 text-white",

    success: "bg-green-500 text-white",

    danger: "bg-red-500 text-white",

    outline: "border border-neutral-300 bg-white text-neutral-800",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded-full font-medium",
        variants[variant],
        sizes[size],
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
