import { Search } from "lucide-react";
import clsx from "clsx";

function SearchBar({
  value,
  onChange,
  placeholder = "Search products...",
  className = "",
  ...props
}) {
  return (
    <div
      className={clsx(
        "flex h-11 w-full items-center rounded-full border border-neutral-300 bg-neutral-50 px-4 transition-all duration-300",
        "focus-within:border-neutral-900",
        "focus-within:bg-white",
        "focus-within:ring-2 focus-within:ring-neutral-900/10",
        className,
      )}
    >
      <Search size={18} className="mr-3 text-neutral-500" />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-neutral-400"
        {...props}
      />
    </div>
  );
}

export default SearchBar;
