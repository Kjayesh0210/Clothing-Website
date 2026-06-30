import clsx from "clsx";

function PageHeader({ title, subtitle, children, className = "" }) {
  return (
    <div
      className={clsx(
        "mb-10 flex flex-col gap-5 border-b border-neutral-200 pb-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          {title}
        </h1>

        {subtitle && <p className="mt-2 text-neutral-600">{subtitle}</p>}
      </div>

      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

export default PageHeader;
