import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import api from "../services/api";
function Navbar() {
  const { cartCount } = useContext(CartContext);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  const [keyword, setKeyword] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const searchProducts = async (value) => {
    setKeyword(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await api.get(`/products/search?keyword=${value}`);

      setSuggestions(res.data);
    } catch (error) {
      console.log(error);
    }
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
            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/wishlist">Wishlist</Link>

            <Link to="/cart">Cart ({cartCount})</Link>

            <Link to="/orders">Orders</Link>

            <Link to="/profile">Profile</Link>

            {/* <Link to="/addresses">Addresses</Link> */}
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
                      to={`/product/${product._id}`}
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
            {token ? (
              <button
                onClick={logout}
                className="
                bg-black
                text-white
                px-4
                py-2
                rounded
                "
              >
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
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

            <Link to="/wishlist" onClick={() => setMenuOpen(false)}>
              Wishlist
            </Link>

            <Link to="/cart" onClick={() => setMenuOpen(false)}>
              Cart ({cartCount})
            </Link>

            <Link to="/orders" onClick={() => setMenuOpen(false)}>
              Orders
            </Link>

            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>

            <Link to="/addresses" onClick={() => setMenuOpen(false)}>
              Addresses
            </Link>

            {token ? (
              <button
                onClick={logout}
                className="
                bg-black
                text-white
                py-2
                rounded
                "
              >
                Logout
              </button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
