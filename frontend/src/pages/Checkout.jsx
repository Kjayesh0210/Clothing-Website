import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [cart, setCart] = useState(null);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [useSavedAddress, setUseSavedAddress] = useState(true);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: token,
        },
      });

      setCart(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/addresses", {
        headers: {
          Authorization: token,
        },
      });

      setAddresses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal =
    cart?.products?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

  const discountAmount = (subtotal * discount) / 100;

  const total = subtotal - discountAmount;

  const applyCoupon = async () => {
    try {
      const res = await api.post("/coupons/validate", {
        code: coupon,
      });

      setDiscount(res.data.discount);

      toast.success("Coupon Applied");
    } catch (error) {
      toast.error("Invalid Coupon");
    }
  };

  const handlePayment = async () => {
    try {
      const finalAddress = useSavedAddress ? selectedAddress : address;

      if (!finalAddress.trim()) {
        toast.error("Please select or enter an address");
        return;
      }

      const token = localStorage.getItem("token");

      const paymentRes = await api.post("/payment/create-order", {
        amount: total,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: paymentRes.data.amount,

        currency: paymentRes.data.currency,

        order_id: paymentRes.data.id,

        name: "Clothing Store",

        description: "Order Payment",

        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify", response);

            if (verifyRes.data.success) {
              await api.post(
                "/orders/place",
                {
                  address: finalAddress,

                  paymentId: verifyRes.data.paymentId,
                },
                {
                  headers: {
                    Authorization: token,
                  },
                },
              );

              toast.success("Payment Successful");

              navigate("/orders");
            }
          } catch (error) {
            console.log(error);

            toast.error("Payment Verification Failed");
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error("Payment Failed");
    }
  };

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-3xl mb-5">Checkout</h1>

      <div
        className="
        border
        p-4
        rounded
        mb-5
        "
      >
        <p>Subtotal: ₹{subtotal}</p>

        <p className="text-green-600">Discount: ₹{discountAmount}</p>

        <h2
          className="
          text-2xl
          font-bold
          mt-2
          "
        >
          Total: ₹{total}
        </h2>
      </div>

      <div className="mb-5">
        <label className="mr-5">
          <input
            type="radio"
            checked={useSavedAddress}
            onChange={() => setUseSavedAddress(true)}
          />

          <span className="ml-2">Use Saved Address</span>
        </label>

        <label>
          <input
            type="radio"
            checked={!useSavedAddress}
            onChange={() => setUseSavedAddress(false)}
          />

          <span className="ml-2">Enter New Address</span>
        </label>
      </div>

      {useSavedAddress ? (
        <select
          value={selectedAddress}
          onChange={(e) => setSelectedAddress(e.target.value)}
          className="
          border
          w-full
          p-3
          "
        >
          <option value="">Select Address</option>

          {addresses.map((item, index) => (
            <option key={index} value={item.address}>
              {item.label}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          rows="5"
          className="
          border
          w-full
          p-3
          "
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      )}

      <div className="mt-5">
        <input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Coupon Code"
          className="
          border
          p-3
          w-full
          "
        />

        <button
          onClick={applyCoupon}
          className="
          bg-gray-800
          text-white
          px-5
          py-3
          mt-2
          "
        >
          Apply Coupon
        </button>
      </div>

      <button
        onClick={handlePayment}
        className="
        bg-black
        text-white
        px-6
        py-3
        mt-5
        w-full
        md:w-auto
        "
      >
        Pay ₹{total}
      </button>
    </div>
  );
}

export default Checkout;
