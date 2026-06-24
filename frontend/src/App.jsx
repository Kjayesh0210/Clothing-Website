import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <div
        className="
        min-h-screen
        flex
        flex-col
        "
      >
        {!["/login", "/register", "/forgot-password"].includes(
          window.location.pathname,
        ) && <Navbar />}

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/register" element={<Register />} />

            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/products" element={<Products />} />

            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/orders" element={<MyOrders />} />

            <Route path="/orders/:id" element={<OrderDetails />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/change-password" element={<ChangePassword />} />

            <Route path="/addresses" element={<Addresses />} />

            <Route path="/admin" element={<AdminDashboard />} />

            <Route path="/admin/products" element={<AdminProducts />} />

            <Route path="/admin/products/add" element={<AddProduct />} />

            <Route path="/admin/products/edit/:id" element={<EditProduct />} />
          </Routes>
        </div>

        {!["/login", "/register", "/forgot-password"].includes(
          window.location.pathname,
        ) && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
