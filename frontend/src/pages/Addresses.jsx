import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

import { MapPin, Home, Building2, Plus, Trash2 } from "lucide-react";

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

  const deleteAddress = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/auth/addresses/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      toast.success("Address deleted");

      fetchAddresses();
    } catch (error) {
      toast.error("Failed to delete address");
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
    <section className="min-h-screen bg-neutral-50 py-8 md:py-12">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-16">
        {/* Header */}
        <div className="mb-10 flex items-center gap-4 sm:gap-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-md sm:h-16 sm:w-16">
            <MapPin size={28} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Saved Addresses
            </h1>

            <p className="mt-2 text-sm text-neutral-500 sm:text-base lg:text-lg">
              Manage your saved delivery locations for a faster checkout
              experience.
            </p>
          </div>
        </div>

        {/* Add Address */}
        <div className="mb-10 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Add New Address
              </h2>

              <p className="mt-2 text-neutral-500">
                Save multiple addresses for home, office or any other location.
              </p>
            </div>

            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 md:flex">
              <Plus size={26} />
            </div>
          </div>

          <div className="space-y-4">
            <input
              placeholder="Home • Office • Hostel"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="h-14 w-full rounded-xl border border-neutral-300 px-5 outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
            />

            <textarea
              rows={5}
              placeholder="Enter complete delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full resize-none rounded-xl border border-neutral-300 p-5 outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
            />

            <button
              onClick={addNewAddress}
              disabled={adding}
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-black px-8 font-semibold text-white transition hover:bg-neutral-800 active:scale-[0.98] disabled:opacity-60 sm:w-auto"
            >
              <Plus size={20} />
              {adding ? "Adding..." : "Add Address"}
            </button>
          </div>
        </div>

        {/* Saved Addresses Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold sm:text-3xl">Your Addresses</h2>

          <p className="mt-2 text-neutral-500">
            {addresses.length} Saved Address
            {addresses.length !== 1 ? "es" : ""}
          </p>
        </div>

        {/* Address Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {addresses.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
                <MapPin size={40} className="text-neutral-500" />
              </div>

              <h3 className="mt-8 text-2xl font-bold sm:text-3xl">
                No Saved Addresses
              </h3>

              <p className="mt-4 max-w-md leading-7 text-neutral-500">
                Save your first delivery address to make checkout faster and
                more convenient for future orders.
              </p>
            </div>
          ) : (
            addresses.map((item, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neutral-100 transition group-hover:bg-black group-hover:text-white sm:h-16 sm:w-16">
                    {item.label.toLowerCase().includes("home") ? (
                      <Home size={24} />
                    ) : (
                      <Building2 size={24} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold sm:text-2xl">
                            {item.label}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteAddress(item._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="border-t border-neutral-200">
                      <p className="text-sm leading-7 text-neutral-600 sm:text-base">
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
    </section>
  );
}

export default Addresses;
