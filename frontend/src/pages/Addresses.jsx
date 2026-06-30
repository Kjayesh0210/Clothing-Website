import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import { MapPin, Home, Building2, Plus } from "lucide-react";

function Addresses() {
  const [addresses, setAddresses] = useState([]);

  const [label, setLabel] = useState("");

  const [address, setAddress] = useState("");

  const [loading, setLoading] = useState(true);

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/auth/addresses", {
        headers: {
          Authorization: token,
        },
      });

      setAddresses(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const addNewAddress = async () => {
    if (!label.trim() || !address.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      if (adding) return;

      setAdding(true);

      const token = localStorage.getItem("token");

      await api.post(
        "/auth/addresses",
        {
          label: label.trim(),
          address: address.trim(),
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Address Added");

      setLabel("");
      setAddress("");

      fetchAddresses();
    } catch (error) {
      toast.error("Failed to add address");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-10">
        <div className="max-w-6xl mx-auto px-6 animate-pulse">
          <div className="h-10 w-60 rounded bg-neutral-200" />

          <div className="h-5 w-80 rounded bg-neutral-200 mt-4" />

          <div className="bg-white rounded-3xl border mt-10 h-72" />

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-3xl border h-44" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <div className="flex items-center gap-5">
            <div
              className="
              w-16
              h-16
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
            "
            >
              <MapPin size={30} />
            </div>

            <div>
              <h1 className="text-5xl font-bold tracking-tight">
                Saved Addresses
              </h1>

              <p className="text-lg text-neutral-500 mt-2">
                Manage your delivery locations for faster checkout.
              </p>
            </div>
          </div>
        </div>

        <div
          className="
          bg-white
          rounded-[32px]
          border
          border-neutral-200
          shadow-sm
          p-10
          mb-12
        "
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Add New Address</h2>

              <p className="text-neutral-500 mt-2">
                Save multiple delivery addresses for your future orders.
              </p>
            </div>

            <div
              className="
              hidden
              md:flex
              w-16
              h-16
              rounded-2xl
              bg-neutral-100
              items-center
              justify-center
            "
            >
              <Plus size={28} />
            </div>
          </div>

          <div className="space-y-6">
            <input
              placeholder="Home • Office • Hostel"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="
              w-full
              h-14
              rounded-2xl
              border
              border-neutral-300
              px-5
              outline-none
              transition-all
              duration-300
              focus:border-black
              focus:ring-4
              focus:ring-neutral-100
            "
            />

            <textarea
              rows={5}
              placeholder="Enter complete delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="
              w-full
              rounded-2xl
              border
              border-neutral-300
              p-5
              outline-none
              resize-none
              transition-all
              duration-300
              focus:border-black
              focus:ring-4
              focus:ring-neutral-100
            "
            />

            <button
              onClick={addNewAddress}
              disabled={adding}
              className="
              h-14
              px-8
              rounded-2xl
              bg-black
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition-all
              duration-300
              hover:bg-neutral-800
              hover:-translate-y-0.5
              active:scale-[0.98]
              disabled:opacity-60
            "
            >
              <Plus size={20} />

              {adding ? "Adding..." : "Add Address"}
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Your Addresses</h2>

              <p className="text-neutral-500 mt-2">
                {addresses.length} Saved Address
                {addresses.length !== 1 ? "es" : ""}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {addresses.length === 0 ? (
              <div
                className="
                col-span-full
                bg-white
                rounded-[32px]
                border
                border-dashed
                border-neutral-300
                p-16
                text-center
              "
              >
                <div
                  className="
                  w-20
                  h-20
                  mx-auto
                  rounded-full
                  bg-neutral-100
                  flex
                  items-center
                  justify-center
                "
                >
                  <MapPin size={36} className="text-neutral-500" />
                </div>

                <h3 className="text-2xl font-bold mt-6">No Saved Addresses</h3>

                <p className="text-neutral-500 mt-3 max-w-md mx-auto leading-7">
                  Save your first address to make checkout faster and more
                  convenient.
                </p>
              </div>
            ) : (
              addresses.map((item, index) => (
                <div
                  key={index}
                  className="
                  bg-white
                  rounded-[28px]
                  border
                  border-neutral-200
                  shadow-sm
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  p-8
                "
                >
                  <div className="flex justify-between items-start gap-5">
                    <div className="flex gap-4">
                      <div
                        className="
                        w-14
                        h-14
                        rounded-2xl
                        bg-neutral-100
                        flex
                        items-center
                        justify-center
                      "
                      >
                        {item.label.toLowerCase().includes("home") ? (
                          <Home size={24} />
                        ) : (
                          <Building2 size={24} />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{item.label}</h3>

                          <span
                            className="
                            px-3
                            py-1
                            rounded-full
                            bg-green-100
                            text-green-700
                            text-xs
                            font-semibold
                          "
                          >
                            Saved
                          </span>
                        </div>

                        <p
                          className="
                          mt-5
                          text-neutral-600
                          leading-7
                        "
                        >
                          {item.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
