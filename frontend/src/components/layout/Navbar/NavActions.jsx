import { Link, NavLink } from "react-router-dom";
import { LayoutDashboard, House, Heart, ShoppingBag, User } from "lucide-react";

function NavActions({ token, cartCount }) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const loginClass = ({ isActive }) => `
  text-sm
  font-medium
  transition-colors
  duration-200
  ${isActive ? "text-black" : "text-neutral-600 hover:text-black"}
`;
  const iconClass = ({ isActive }) => `
  relative
  flex
  h-10
  w-10
  items-center
  justify-center
  rounded-full
  transition-all
  duration-300
  ${
    isActive
      ? "bg-neutral-500 text-black"
      : "text-neutral-700 hover:bg-neutral-200 hover:text-black"
  }
`;

  if (!token) {
    return (
      <div className="hidden lg:flex items-center">
        <NavLink to="/login" className={loginClass}>
          LOGIN
        </NavLink>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-6">
      <NavLink to="/" className={iconClass}>
        <House size={22} />
      </NavLink>

      <NavLink to="/wishlist" className={iconClass}>
        <Heart size={22} />
      </NavLink>

      <NavLink to="/cart" className={iconClass}>
        <ShoppingBag size={22} />

        {cartCount > 0 && (
          <span
            className="
        absolute
        -right-1
        -top-1
        flex
        h-5
        min-w-[20px]
        items-center
        justify-center
        rounded-full
        bg-black
        px-1
        text-[10px]
        font-semibold
        text-white
      "
          >
            {cartCount}
          </span>
        )}
      </NavLink>

      <NavLink to="/profile" className={iconClass}>
        <User size={22} />
      </NavLink>

      {user?.role === "admin" && (
        <Link
          to="/admin"
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
        "
        >
          <LayoutDashboard size={22} />
        </Link>
      )}
    </div>
  );
}

export default NavActions;
