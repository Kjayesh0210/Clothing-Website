import clsx from "clsx";

function Skeleton({ className = "" }) {
  return (
    <div
      className={clsx("animate-pulse rounded-xl bg-neutral-200", className)}
    />
  );
}

export default Skeleton;
