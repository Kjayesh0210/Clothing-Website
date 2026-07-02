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
    <div className="min-h-screen bg-neutral-50 flex justify-center py-12">
      <div className="w-full max-w-7xl px-6 lg:px-8">
        <div className="h-10"></div>
        {/* Header */}
        <div className="mb-14 flex items-center gap-6">
          <div
            className="
            w-16
            h-16
            rounded-3xl
            bg-black
            text-white
            flex
            items-center
            justify-center
            shadow-md
          "
          >
            <MapPin size={30} />
          </div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-neutral-900">
              Saved Addresses
            </h1>

            <p className="mt-3 text-lg text-neutral-500">
              Manage your saved delivery locations for a faster checkout
              experience.
            </p>
          </div>
        </div>
        <div className="h-5"></div>

        {/* Add Address */}
        <div
          className="
          p-10
          mb-14
        "
        >
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold">Add New Address</h2>

              <p className="mt-2 text-neutral-500">
                Save multiple addresses for home, office or any other location.
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
              rounded-xl
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
            <div className="h-4"></div>

            <textarea
              rows={5}
              placeholder="Enter complete delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="
              w-full
              rounded-xl
              border
              border-neutral-300
              p-5
              resize-none
              outline-none
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
              w-50
              px-8
              rounded-2xl
              bg-black
              text-white
              font-semibold
              inline-flex
              items-center
              justify-center
              gap-3
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
        <div className="h-4"></div>

        {/* Saved Addresses Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Your Addresses</h2>

            <p className="mt-2 text-neutral-500">
              {addresses.length} Saved Address
              {addresses.length !== 1 ? "es" : ""}
            </p>
          </div>
        </div>
        <div className="h-4"></div>

        <div className="grid md:grid-cols-4 gap-8">
          {addresses.length === 0 ? (
            <div
              className="
      col-span-full
      bg-white
      rounded-3xl
      border
      border-dashed
      border-neutral-300
      p-20
      text-center
      flex
      flex-col
      items-center
      justify-center
    "
            >
              <div
                className="
        w-24
        h-24
        rounded-full
        bg-neutral-100
        flex
        items-center
        justify-center
      "
              >
                <MapPin size={40} className="text-neutral-500" />
              </div>

              <h3 className="mt-8 text-3xl font-bold">No Saved Addresses</h3>

              <p className="mt-4 max-w-md text-neutral-500 leading-8">
                Save your first delivery address to make checkout faster and
                more convenient for future orders.
              </p>
            </div>
          ) : (
            addresses.map((item, index) => (
              <div
                key={index}
                className="
        group
        bg-white
        rounded-3xl
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
                <div className="flex items-start gap-5">
                  <div
                    className="
            w-16
            h-16
            rounded-2xl
            bg-neutral-100
            flex
            items-center
            justify-center
            shrink-0
            transition
            group-hover:bg-black
            group-hover:text-white
          "
                  >
                    {item.label.toLowerCase().includes("home") ? (
                      <Home size={26} />
                    ) : (
                      <Building2 size={26} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold">{item.label}</h3>

                        <span className="rounded-full bg-green-100 text-green-700 text-xs font-semibold px-3 py-1">
                          Saved
                        </span>
                      </div>

                      <button
                        onClick={() => deleteAddress(item._id)}
                        className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-xl
      text-neutral-500
      transition
      hover:bg-red-50
      hover:text-red-600
    "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-6 border-t border-neutral-200 pt-6">
                      <p className="text-neutral-600 leading-8">
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
  );
}

export default Addresses;
