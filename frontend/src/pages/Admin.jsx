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
      <header className="sticky top-[84px] z-40 pointer-events-none">
        <div className="flex justify-center pt-5">
          <nav
            className="
            pointer-events-auto
            grid
            h-12
            w-[500px]
            grid-cols-3
            gap-2
            rounded-2xl
            border
            border-neutral-200
            bg-white
            p-2
            shadow-lg
        "
          >
            <NavLink to="dashboard" className={navClass}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="products" className={navClass}>
              <Package size={18} />
              Products
            </NavLink>

            <NavLink to="categories" className={navClass}>
              <Tags size={18} />
              Categories
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
