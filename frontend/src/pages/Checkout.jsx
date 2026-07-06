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
    <section className="min-h-screen bg-neutral-50 py-8 md:py-6">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-4 flex items-start gap-4">
          <ShieldCheck size={32} className="mt-1 shrink-0 text-green-600" />

          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Secure Checkout
            </h1>

            <p className="mt-2 text-sm text-neutral-500 sm:text-base">
              Complete your purchase safely and securely.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
          {/* Left */}
          <div className="space-y-4">
            {/* Address */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <MapPin size={24} />
                <h2 className="text-xl font-bold sm:text-2xl">
                  Delivery Address
                </h2>
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

            {/* Coupon */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <TicketPercent size={24} />
                <h2 className="text-xl font-bold sm:text-2xl">Coupon</h2>
              </div>

              <CouponCard
                coupon={coupon}
                setCoupon={setCoupon}
                applyCoupon={applyCoupon}
                discount={discount}
              />
            </div>

            {/* Payment */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard size={24} />
                <h2 className="text-xl font-bold sm:text-2xl">
                  Payment Method
                </h2>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">Razorpay</p>

                    <p className="mt-1 text-sm leading-6 text-neutral-500">
                      Credit Card • Debit Card • UPI • Net Banking • Wallets
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    Recommended
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
                <div className="flex items-start gap-4">
                  <ShieldCheck
                    size={24}
                    className="mt-1 shrink-0 text-green-600"
                  />

                  <div>
                    <p className="font-semibold text-green-700">
                      100% Secure Payments
                    </p>

                    <p className="mt-1 text-sm leading-6 text-green-600">
                      Your payment details are encrypted and securely processed
                      through Razorpay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit lg:sticky lg:top-24">
            <CheckoutSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={discountAmount}
              total={total}
              paymentLoading={paymentLoading}
              handlePayment={handlePayment}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
