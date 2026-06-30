import { Link, NavLink } from "react-router-dom";
import { X, Menu, ShoppingBag, User, Heart } from "lucide-react";
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
          w-[320px]
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
            p-5
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

        <nav className="px-5">
          <NavLink
            to="/products?gender=Men"
            onClick={() => setMenuOpen(false)}
            className="block py-4 text-base font-medium"
          >
            MEN
          </NavLink>

          <NavLink
            to="/products?gender=Women"
            onClick={() => setMenuOpen(false)}
            className="block py-4 text-base font-medium"
          >
            WOMEN
          </NavLink>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-3 py-4"
          >
            <Heart size={20} />
            Wishlist
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-between py-4"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag size={20} />
              Cart
            </div>

            {cartCount > 0 && (
              <span
                className="
                  rounded-full
                  bg-black
                  px-2
                  py-0.5
                  text-xs
                  text-white
                "
              >
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Bottom */}

        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            border-t
            border-neutral-200
            p-5
          "
        >
          {token ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="
                  mb-4
                  flex
                  items-center
                  gap-3
                "
              >
                <User size={20} />
                Profile
              </Link>

              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="block mb-4"
              >
                Orders
              </Link>

              <button
                className="
                  w-full
                  rounded-full
                  border
                  border-neutral-300
                  py-3
                  font-medium
                "
              >
                Logout
              </button>
            </>
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
