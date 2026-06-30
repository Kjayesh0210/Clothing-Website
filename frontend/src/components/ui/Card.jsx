import clsx from "clsx";

function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
  as: Component = "div",
}) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <Component
      className={clsx(
        "rounded-2xl border border-neutral-200 bg-white",
        "transition-all duration-300",
        hover && "hover:-translate-y-1 hover:shadow-lg",
        paddings[padding],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Card;
