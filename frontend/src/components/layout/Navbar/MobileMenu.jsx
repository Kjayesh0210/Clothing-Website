import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  X,
  Menu,
  ShoppingBag,
  User,
  Heart,
  Package,
  Shield,
} from "lucide-react";
import SearchBar from "./SearchBar";

function MobileMenu({
  menuOpen,
  setMenuOpen,
  token,
  cartCount,
  keyword,
  searchProducts,
  suggestions,
  setSuggestions,
}) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMenuOpen(false);

    navigate("/");
  };
  return (
    <>
      {/* Hamburger */}

      <button
        onClick={() => setMenuOpen(true)}
        className="
          flex
          lg:hidden
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          transition
          hover:bg-neutral-100
        "
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}

      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      {/* Drawer */}

      <aside
        className={`
        fixed
        top-0
        left-0
        z-50
        h-screen
        w-[85vw]
        max-w-[340px]
        overflow-y-auto
        bg-white
        transition-transform
        duration-300
        lg:hidden
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-neutral-200
            pt-[max(20px,env(safe-area-inset-top))]
            px-5
            pb-5
          "
        >
          <h2 className="text-xl font-bold tracking-[0.18em]">THREADDOT</h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="
              rounded-full
              p-2
              hover:bg-neutral-100
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Search */}

        <div className="p-5">
          <SearchBar
            keyword={keyword}
            searchProducts={searchProducts}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          />
        </div>

        {/* Navigation */}

        <nav className="space-y-2 px-5 py-4">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="
            block
            rounded-xl
            px-3
            py-4
            text-base
            font-medium
            transition
            hover:bg-neutral-100
          "
          >
            HOME
          </NavLink>

          <NavLink
            to="/products?gender=Men"
            onClick={() => setMenuOpen(false)}
            className="
            block
            rounded-xl
            px-3
            py-4
            text-base
            font-medium
            transition
            hover:bg-neutral-100
            "
          >
            MEN
          </NavLink>

          <NavLink
            to="/products?gender=Women"
            onClick={() => setMenuOpen(false)}
            className="
            block
            rounded-xl
            px-3
            py-4
            text-base
            font-medium
            transition
            hover:bg-neutral-100
            "
          >
            WOMEN
          </NavLink>
        </nav>

        {/* Bottom */}

        <div className="border-t border-neutral-200 bg-white p-5">
          {token ? (
            <div className="space-y-2">
              <Link
                to="/wishlist"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-neutral-100"
              >
                <Heart size={20} />
                <span className="font-medium">Wishlist</span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-neutral-100"
              >
                <div className="flex items-center gap-4">
                  <ShoppingBag size={20} />
                  <span className="font-medium">Cart</span>
                </div>

                {cartCount > 0 && (
                  <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-black px-2 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-neutral-100"
              >
                <User size={20} />
                <span className="font-medium">Profile</span>
              </Link>

              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-neutral-100"
              >
                <Package size={20} />
                <span className="font-medium">Orders</span>
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 transition hover:bg-neutral-100"
                >
                  <Shield size={20} />
                  <span className="font-medium">Admin</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="
                mt-3
                w-full
                rounded-full
                border
                border-neutral-300
                py-3
                font-medium
                transition
                hover:bg-neutral-100
              "
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="
        block
        rounded-full
        bg-black
        py-3
        text-center
        font-medium
        text-white
        transition
        hover:bg-neutral-800
      "
            >
              Login
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

export default MobileMenu;
