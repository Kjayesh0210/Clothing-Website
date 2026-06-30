import clsx from "clsx";

function SectionTitle({ title, subtitle, align = "left", className = "" }) {
  return (
    <div
      className={clsx(
        "mb-10",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
    >
      <h2 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-2xl text-base text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionTitle;
