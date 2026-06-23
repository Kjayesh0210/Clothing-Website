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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedKeyword.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await api.get(
          `/products/search?keyword=${debouncedKeyword}`,
        );

        setSuggestions(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSuggestions();
  }, [debouncedKeyword]);

  const searchProducts = (value) => {
    setKeyword(value);
  };

  return (
    <nav
      className="
      bg-white
      border-b
      sticky
      top-0
      z-50
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        py-4
        "
      >
        <div
          className="
          flex
          justify-between
          items-center
          "
        >
          <Link
            to="/"
            className="
            text-2xl
            font-bold
            "
          >
            CLOTHIFY
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="
            md:hidden
            text-2xl
            "
          >
            ☰
          </button>

          <div
            className="
            hidden
            md:flex
            items-center
            gap-6
            "
          >
            <div className="relative">
              <input
                value={keyword}
                onChange={(e) => searchProducts(e.target.value)}
                placeholder="Search..."
                className="
                border
                px-3
                py-2
                rounded
                "
              />

              {suggestions.length > 0 && (
                <div
                  className="
                  absolute
                  top-full
                  left-0
                  bg-white
                  border
                  w-full
                  shadow
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
                      block
                      p-2
                      hover:bg-gray-100
                      "
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            {token ? (
              <>
                <Link to="/cart">Cart ({cartCount})</Link>

                <Link to="/wishlist">Wishlist</Link>

                <Link to="/orders">Orders</Link>

                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>

                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div
            className="
            md:hidden
            flex
            flex-col
            gap-4
            mt-4
            "
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Products
            </Link>

            {token ? (
              <>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  Cart ({cartCount})
                </Link>

                <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
                  Wishlist
                </Link>

                <Link to="/orders" onClick={() => setMenuOpen(false)}>
                  Orders
                </Link>

                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>

                <Link to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
