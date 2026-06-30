import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";

import { ShieldCheck, MapPin, CreditCard, TicketPercent } from "lucide-react";

import CheckoutSummary from "../components/checkout/CheckoutSummary";
import AddressSelector from "../components/checkout/AddressSelector";
import CouponCard from "../components/checkout/CouponCard";
import CheckoutSkeleton from "../components/checkout/CheckoutSkeleton";

function Checkout() {
  const navigate = useNavigate();

  const { fetchCartCount } = useContext(CartContext);

  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(null);

  const [addresses, setAddresses] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState("");

  const [useSavedAddress, setUseSavedAddress] = useState(true);

  const [address, setAddress] = useState("");

  const [coupon, setCoupon] = useState("");

  const [discount, setDiscount] = useState(0);

  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      setLoading(true);

      await Promise.all([fetchCart(), fetchAddresses()]);
    } finally {
      setLoading(false);
    }
  };

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

      if (res.data.length > 0) {
        setSelectedAddress(res.data[0].address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subtotal =
    cart?.products?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ) || 0;

  const shipping = subtotal >= 999 ? 0 : 99;

  const discountAmount = (subtotal * discount) / 100;

  const total = subtotal + shipping - discountAmount;

  const applyCoupon = async () => {
    if (!coupon.trim()) {
      toast.error("Enter coupon code");

      return;
    }

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
      if (paymentLoading) return;

      const finalAddress = useSavedAddress ? selectedAddress : address;

      if (!finalAddress.trim()) {
        toast.error("Please select or enter an address");
        return;
      }

      setPaymentLoading(true);

      const token = localStorage.getItem("token");

      const paymentRes = await api.post("/payment/create-order", {
        amount: total,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: paymentRes.data.amount,

        currency: paymentRes.data.currency,

        order_id: paymentRes.data.id,

        name: "DRIPSTORE",

        description: "Secure Checkout",

        image: "/logo.png",

        theme: {
          color: "#000000",
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        notes: {
          address: finalAddress,
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          },
        },

        handler: async function (response) {
          try {
            const verifyRes = await api.post("/payment/verify", response);

            if (!verifyRes.data.success) {
              toast.error("Payment Verification Failed");
              setPaymentLoading(false);
              return;
            }

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

            await fetchCartCount();

            toast.success("Order Placed Successfully");

            navigate("/orders");
          } catch (error) {
            console.log(error);

            toast.error("Payment Verification Failed");
          } finally {
            setPaymentLoading(false);
          }
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      toast.error("Payment Failed");

      setPaymentLoading(false);
    }
  };

  if (loading) {
    return <CheckoutSkeleton />;
  }
  return (
    <div className="min-h-screen bg-neutral-50 py-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" size={30} />

            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Secure Checkout
              </h1>

              <p className="text-neutral-500 mt-2">
                Complete your purchase safely and securely.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="text-black" size={24} />

                <h2 className="text-2xl font-bold">Delivery Address</h2>
              </div>

              <AddressSelector
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                useSavedAddress={useSavedAddress}
                setUseSavedAddress={setUseSavedAddress}
                address={address}
                setAddress={setAddress}
              />
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <TicketPercent size={24} />

                <h2 className="text-2xl font-bold">Coupon</h2>
              </div>

              <CouponCard
                coupon={coupon}
                setCoupon={setCoupon}
                applyCoupon={applyCoupon}
                discount={discount}
              />
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm p-8">
              <div className="flex items-center gap-3 mb-8">
                <CreditCard size={24} />

                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-lg">Razorpay</p>

                    <p className="text-neutral-500 mt-1">
                      Credit Card • Debit Card • UPI • Net Banking • Wallets
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium text-sm">
                    Recommended
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-green-50 border border-green-200 p-5">
                <div className="flex items-start gap-4">
                  <ShieldCheck
                    size={24}
                    className="text-green-600 shrink-0 mt-1"
                  />

                  <div>
                    <p className="font-semibold text-green-700">
                      100% Secure Payments
                    </p>

                    <p className="text-green-600 mt-1 text-sm leading-6">
                      Your payment details are encrypted and securely processed
                      through Razorpay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discountAmount}
              total={total}
              paymentLoading={paymentLoading}
              handlePayment={handlePayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
