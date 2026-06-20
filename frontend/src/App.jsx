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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/checkout" element={<Checkout />} />

        <Route path="/orders" element={<MyOrders />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/admin/products" element={<AdminProducts />} />

        <Route path="/admin/products/add" element={<AddProduct />} />
        
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
