import clsx from "clsx";

function Container({
  children,
  className = "",
  size = "default",
  as: Component = "div",
}) {
  const sizes = {
    sm: "max-w-5xl",
    default: "max-w-7xl",
    lg: "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <Component
      className={clsx(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizes[size],
        className,
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
