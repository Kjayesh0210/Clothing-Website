import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Package,
  MapPin,
  Shield,
  LogOut,
  Save,
  ArrowRight,
} from "lucide-react";

function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get("/auth/profile", {
        headers: {
          Authorization: token,
        },
      });

      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        "/auth/profile",
        {
          name: form.name,
          phone: form.phone,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");

    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16 animate-pulse">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-14 w-64 rounded bg-neutral-200" />

          <div className="mt-12 h-64 rounded-3xl bg-neutral-200" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-44 rounded-3xl bg-neutral-200" />
            ))}
          </div>

          <div className="mt-10 h-[420px] rounded-3xl bg-neutral-200" />
        </div>
      </div>
    );
  }
  return (
    <div className="bg-neutral-50 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
          My Account
        </h1>

        <p className="text-lg text-neutral-500 mt-3">
          Manage your profile, orders and account settings.
        </p>

        <div
          className="
              bg-white
              rounded-[32px]
              border
              border-neutral-200
              shadow-sm
              p-5 sm:p-8 lg:p-6
              mb-4
            "
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 sm:p-8 lg:p-0">
            <div className="h-28 flex items-center gap-4">
              <div
                className="
                    w-20
                    h-20
                    rounded-full
                    bg-black
                    text-white
                    flex
                    items-center
                    justify-center
                    text-4xl
                    font-bold
                    shrink-0
                  "
              >
                {form.name ? form.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div>
                <h2 className="text-4xl md:text-3xl font-bold">
                  {form.name || "User"}
                </h2>

                <div className="mt-2">
                  <div className="flex items-center gap-3 text-neutral-600">
                    <Mail size={18} />

                    <span>{form.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-600">
                    <Phone size={18} />

                    <span>{form.phone || "No phone number"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              to="/orders"
              className="
                  group
                  bg-white
                  rounded-xl
                  border
                  border-neutral-200
                  shadow-sm
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
            >
              <div className="max-w-6xl mx-auto sm:px-2 lg:px-2">
                <Package
                  size={34}
                  className="text-black transition group-hover:scale-110"
                />

                <h3 className="text-xl font-semibold mt-2">My Orders</h3>

                <p className="text-neutral-500 mt-2 leading-7">
                  View, track and manage your recent orders.
                </p>

                <div className="mt-4 flex items-center gap-2 font-semibold">
                  Open
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            <Link
              to="/addresses"
              className="
                  group
                  bg-white
                  rounded-xl
                  border
                  border-neutral-200
                  shadow-sm
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
            >
              <div className="max-w-6xl mx-auto sm:px-2 lg:px-2">
                <Package
                  size={34}
                  className="text-black transition group-hover:scale-110"
                />

                <h3 className="text-xl font-semibold mt-2">Addresses</h3>

                <p className="text-neutral-500 mt-2 leading-7">
                  Manage saved delivery addresses.
                </p>

                <div className="mt-4 flex items-center gap-2 font-semibold">
                  Open
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>

            <Link
              to="/change-password"
              className="
                  group
                  bg-white
                  rounded-xl
                  border
                  border-neutral-200
                  shadow-sm
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
            >
              <div className="max-w-6xl mx-auto sm:px-2 lg:px-2">
                <Package
                  size={34}
                  className="text-black transition group-hover:scale-110"
                />

                <h3 className="text-xl font-semibold mt-2">Security</h3>

                <p className="text-neutral-500 mt-2 leading-7">
                  Update your password and account security.
                </p>

                <div className="mt-4 flex items-center gap-2 font-semibold">
                  Open
                  <ArrowRight size={18} />
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 lg:p-10 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Personal Information</h2>

              <p className="text-neutral-500">
                Keep your account information up to date.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Name */}

              <div>
                <label className="block mb-2 font-medium">Full Name</label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl border border-neutral-300 pl-11 pr-4 outline-none focus:border-black focus:ring-2 focus:ring-neutral-200"
                  />
                </div>
              </div>

              {/* Email */}

              <div>
                <label className="block mb-2 font-medium">Email Address</label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    value={form.email}
                    disabled
                    className="w-full h-12 rounded-xl border border-neutral-200 bg-neutral-100 pl-11 pr-4 text-neutral-500"
                  />
                </div>
              </div>

              {/* Phone */}

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">Phone Number</label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                  />

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full h-12 rounded-xl border border-neutral-300 pl-11 pr-4 outline-none focus:border-black focus:ring-2 focus:ring-neutral-200"
                  />
                </div>
              </div>
            </div>

            <div className="my-10 border-t border-neutral-200" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-lg">
                <h3 className="text-2xl font-semibold">Save Your Changes</h3>

                <p className="mt-2 text-neutral-500 leading-7">
                  Your profile information helps us personalize your shopping
                  experience and keep your account updated.
                </p>
              </div>

              <button
                onClick={saveProfile}
                className="w-full sm:w-auto h-12 px-8 rounded-xl bg-black text-white font-semibold flex items-center justify-center gap-2 transition hover:bg-neutral-800"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>

            <div className="my-10 border-t border-neutral-200" />

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="max-w-lg">
                <h3 className="text-2xl font-semibold text-red-600">Logout</h3>

                <p className="mt-2 text-neutral-500 leading-7">
                  Logging out will end your current session. You'll need to sign
                  in again to access your account and orders.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full sm:w-auto h-12 px-8 rounded-xl border-2 border-red-500 text-red-600 font-semibold flex items-center justify-center gap-2 transition hover:bg-red-500 hover:text-white"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
