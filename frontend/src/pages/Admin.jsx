import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Tags } from "lucide-react";

function Admin() {
  const navClass = ({ isActive }) => `
  flex
  w-full
  h-full
  items-center
  justify-center
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
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-16 z-40 flex justify-center px-4 pt-4">
        <nav className="grid w-full max-w-md grid-cols-3 gap-2 rounded-2xl border border-neutral-200 bg-white p-2 shadow-md">
          <NavLink to="dashboard" className={navClass}>
            <LayoutDashboard size={18} />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>

          <NavLink to="products" className={navClass}>
            <Package size={18} />
            <span className="hidden sm:inline">Products</span>
          </NavLink>

          <NavLink to="categories" className={navClass}>
            <Tags size={18} />
            <span className="hidden sm:inline">Categories</span>
          </NavLink>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
