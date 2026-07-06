import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, Tags } from "lucide-react";

function AdminNavbar() {
  const linkClass = ({ isActive }) =>
    `
      flex
      items-center
      gap-2
      rounded-xl
      px-5
      py-3
      text-sm
      font-semibold
      transition-all
      duration-300
      ${
        isActive
          ? "bg-black text-white shadow-md"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
      }
    `;

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <h1 className="text-xl font-extrabold tracking-tight sm:text-2xl">
          THREADDOT
          <span className="ml-2 text-sm font-medium text-neutral-500 sm:text-base">
            Admin
          </span>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-2 md:flex">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <Package size={18} />
            <span>Products</span>
          </NavLink>

          <NavLink to="/admin/categories" className={linkClass}>
            <Tags size={18} />
            <span>Categories</span>
          </NavLink>
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-1 md:hidden">
          <NavLink
            to="/admin/dashboard"
            className="rounded-xl p-2 transition hover:bg-neutral-100"
          >
            <LayoutDashboard size={22} />
          </NavLink>

          <NavLink
            to="/admin/products"
            className="rounded-xl p-2 transition hover:bg-neutral-100"
          >
            <Package size={22} />
          </NavLink>

          <NavLink
            to="/admin/categories"
            className="rounded-xl p-2 transition hover:bg-neutral-100"
          >
            <Tags size={22} />
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
