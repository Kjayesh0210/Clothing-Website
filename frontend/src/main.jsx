import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
    </CartProvider>
  </React.StrictMode>,
);
