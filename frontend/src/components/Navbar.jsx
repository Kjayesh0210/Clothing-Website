import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";

function Navbar() {
  const { cartCount } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navLink =
    "relative transition-all duration-300 hover:text-black after:absolute after:left-0 after:-bottom-1.5 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full";

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (debouncedKeyword.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(
          `/products/search?keyword=${encodeURIComponent(debouncedKeyword)}`,
          {
            signal: controller.signal,
          },
        );

        setSuggestions(res.data);
      } catch (error) {
        if (error.name !== "CanceledError") {
          console.log(error);
        }
      }
    };

    fetchSuggestions();

    return () => controller.abort();
  }, [debouncedKeyword]);

  const searchProducts = (value) => {
    setKeyword(value);
  };

  return (
    <nav
      className="
        sticky
        top-0
        z-50
        bg-white/90
        backdrop-blur-xl
        border-b
        border-neutral-200
        shadow-sm
      "
    >
      <div className="mx-auto grid h-20 w-[95%] grid-cols-[auto_1fr_auto] items-center gap-20">
        
        {/* Logo */}

        <Link to="/" className="shrink-0 select-none">
          <span
            className="text-3xl tracking-[0.22em] font-black uppercase text-neutral-900"
          >
            THREADDOT
          </span>
        </Link>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            md:hidden
            h-11
            w-11
            rounded-full
            border
            border-neutral-300
            flex
            items-center
            justify-center
            text-xl
            transition-all
            duration-300
            hover:bg-neutral-100
            active:scale-95
          "
        >
          ☰
        </button>
        <div className="hidden md:contents">

          {/* Desktop Navigation */}

          {/* Search */}

          <div className="hidden justify-center md:flex">
            <div className="relative w-full max-w-2xl">
              <div
                className="
                flex
                items-center
                w-full
                h-12
                rounded-full
                border
                border-neutral-300
                bg-white
                px-4
                transition-all
                duration-300
                focus-within:bg-white
                focus-within:border-black
                focus-within:ring-1
                focus-within:ring-black/5
              "
              >
                {/* Search Icon */}

                <div className="flex items-center justify-center text-neutral-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="w-10 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                    />
                  </svg>
                </div>

                {/* Input */}

                <input
                  value={keyword}
                  onChange={(e) => searchProducts(e.target.value)}
                  placeholder="Search products..."
                  className="
                flex-1
                ml-3
                bg-transparent
                text-base
                font-medium
                text-neutral-800
                placeholder:text-neutral-400
                placeholder:font-normal
                placeholder:text-[15px]
                outline-none
                border-none
              "
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => {
                      setKeyword("");
                      setSuggestions([]);
                    }}
                    className="
                  ml-2
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-full
                  text-neutral-400
                  transition
                "
                  >
                    ✕
                  </button>
                )}
              </div>
              {/* Suggestions */}

              {suggestions.length > 0 && (
                <div
                  className="
                absolute
                top-full
                left-0
                w-full
                bg-white
                rounded-2xl
                border
                border-neutral-200
                shadow-2xl
                overflow-hidden
                max-h-96
                overflow-y-auto
                z-50
              "
                >
                  {suggestions.map((product) => (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      onClick={() => {
                        setSuggestions([]);
                        setKeyword("");
                      }}
                      className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-4
                    border-b
                    border-neutral-100
                    hover:bg-neutral-50
                    transition-all
                    duration-200
                    last:border-b-0
                  "
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <img
                          src={product.images?.[0]}
                          alt={product.title}
                          className="
                        w-14
                        h-14
                        rounded-xl
                        object-cover
                        border
                        border-neutral-200
                        flex-shrink-0
                      "
                        />

                        <div className="min-w-0">
                          <p
                            className="
                        text-[15px]
                        font-semibold
                        text-neutral-800
                        truncate
                      "
                          >
                            {product.title}
                          </p>

                          <p className="text-sm text-neutral-500 mt-1">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>

                      <span
                        className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-neutral-400
            transition
            group-hover:text-black
          "
                      >
                        View →
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}

          <div className="hidden md:flex items-center gap-8 text-[1.05rem] font-medium">
            <Link to="/" className={navLink}>
              Home
            </Link>

            <Link to="/products" className={navLink}>
              Products
            </Link>

            {token ? (
              <>
                {/* Cart */}

                <Link
                  to="/cart"
                  className="flex items-center gap-2 transition hover:text-black"
                >
                  <span>Cart</span>

                  <span
                    className="
                    flex
                    items-center
                    justify-center
                    min-w-[24px]
                    h-6
                    px-2
                    rounded-full
                    bg-black
                    text-white
                    text-xs
                    font-semibold
                  "
                  >
                    {cartCount}
                  </span>
                </Link>

                <Link to="/wishlist" className={navLink}>
                  Wishlist
                </Link>

                <Link to="/orders" className={navLink}>
                  Orders
                </Link>

                <Link to="/profile" className={navLink}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className={navLink}>
                  Login
                </Link>

                <Link
                  to="/register"
                  className="
          rounded-full
          bg-black
          text-white
          px-5
          py-2.5
          font-medium
          transition-all
          duration-300
          hover:bg-neutral-800
          hover:shadow-lg
        "
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div
            className="
            md:hidden
            mt-5
            rounded-3xl
            border
            border-neutral-200
            bg-white
            shadow-xl
            overflow-hidden
            animate-in
            slide-in-from-top-3
            duration-300
          "
          >
            {/* Mobile Search */}

            <div className="p-5 border-b border-neutral-100">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  w-5
                  h-5
                  text-neutral-400
                "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                  />
                </svg>

                <input
                  value={keyword}
                  onChange={(e) => searchProducts(e.target.value)}
                  placeholder="Search products..."
                  className="
                  w-full
                  h-12
                  pl-12
                  pr-4
                  rounded-full
                  border
                  border-neutral-300
                  bg-neutral-50
                  text-sm
                  placeholder:text-neutral-400
                  focus:outline-none
                  focus:border-black
                  focus:bg-white
                  transition-all
                "
                />
              </div>

              {suggestions.length > 0 && (
                <div
                  className="
            rounded-b-2xl
            rounded-t-none
            border
            border-t-0
            border-neutral-200
            overflow-hidden
          "
                >
                  {suggestions.map((product) => (
                    <Link
                      key={product._id}
                      to={`/products/${product._id}`}
                      onClick={() => {
                        setSuggestions([]);
                        setKeyword("");
                        setMenuOpen(false);
                      }}
                      className="
                block
                px-5
                py-3
                text-sm
                border-b
                border-neutral-100
                hover:bg-neutral-50
                last:border-none
              "
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation */}

            <div className="flex flex-col py-2">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="
                px-6
                py-4
                text-neutral-700
                hover:bg-neutral-50
                transition
              "
              >
                Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMenuOpen(false)}
                className="
                px-6
                py-4
                text-neutral-700
                hover:bg-neutral-50
                transition
                "     
              >
                Products
              </Link>

              {token ? (
                <>
                  <Link
                    to="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="
                    flex
                    justify-between
                    items-center
                    px-6
                    py-4
                    hover:bg-neutral-50
                    transition
                  "
                  >
                    <span>Cart</span>

                    <span
                      className="
                      w-7
                      h-7
                      rounded-full
                      bg-black
                      text-white
                      flex
                      items-center
                      justify-center
                      text-xs
                      font-semibold
                    "
                    >
                      {cartCount}
                    </span>
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setMenuOpen(false)}
                    className="
                    px-6
                    py-4
                    hover:bg-neutral-50
                    transition
                  "
                  >
                    Wishlist
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="
                    px-6
                    py-4
                    hover:bg-neutral-50
                    transition
                  "
                  >
                    Orders
                  </Link>

                  <div className="px-5 pt-3 pb-5">
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="
                      block
                      text-center
                      rounded-full
                      bg-black
                      text-white
                      py-3
                      font-medium
                      transition-all
                      hover:bg-neutral-800
                    "
                    >
                      Profile
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="
                    px-6
                    py-4
                    hover:bg-neutral-50
                    transition
                  "
                  >
                    Login
                  </Link>

                  <div className="px-5 pt-3 pb-5">
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="
                      block
                      text-center
                      rounded-full
                      bg-black
                      text-white
                      py-3
                      font-medium
                      transition-all
                      hover:bg-neutral-800
                    "
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
