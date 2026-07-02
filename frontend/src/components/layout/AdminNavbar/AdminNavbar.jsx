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
    <nav className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            THREADDOT
            <span className="ml-2 text-base font-medium text-neutral-500">
              Admin
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-2">
          <NavLink to="/admin/dashboard" className={linkClass}>
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink to="/admin/products" className={linkClass}>
            <Package size={18} />
            Products
          </NavLink>

          <NavLink to="/admin/categories" className={linkClass}>
            <Tags size={18} />
            Categories
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
