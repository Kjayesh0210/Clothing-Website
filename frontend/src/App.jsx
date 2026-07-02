import { Navigate ,Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Products = lazy(() => import("./pages/Products"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const Addresses = lazy(() => import("./pages/Addresses"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const AdminCategories = lazy(() => import("./pages/AdminCategories"));

import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/Footer";
import AdminRoute from "./components/AdminRoute";
function App() {
  const location = useLocation();

  const hideLayout = ["/login", "/register", "/forgot-password"].includes(
    location.pathname,
  );
  return (
    <>
      <ScrollToTop />
      <div
        className="
        min-h-screen
        flex
        flex-col
        "
      >
        {!hideLayout && <Navbar />}

        <div className="flex-1">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[60vh]">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/login" element={<Login />} />

              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/register" element={<Register />} />

              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

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

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              >
                <Route index element={<Navigate to="dashboard" replace />} />

                <Route path="dashboard" element={<AdminDashboard />} />

                <Route path="products" element={<AdminProducts />} />

                <Route path="products/add" element={<AddProduct />} />

                <Route path="products/edit/:id" element={<EditProduct />} />

                <Route path="categories" element={<AdminCategories />} />
              </Route>
            </Routes>
          </Suspense>
        </div>

        {!hideLayout && <Footer />}
      </div>
    </>
  );
}

export default App;
