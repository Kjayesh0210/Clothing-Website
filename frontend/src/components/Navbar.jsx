import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="bg-black text-white p-4">
      <div className="flex gap-5">
        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/cart">Cart ({cartCount})</Link>

        <Link to="/wishlist">Wishlist</Link>
      </div>
    </nav>
  );
}

export default Navbar;
