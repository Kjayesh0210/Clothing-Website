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

          <div className="grid md:grid-cols-3 gap-6 mt-10">
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
    <div className="bg-neutral-50">
      <div className="h-8"></div>
      <div className="w-full">
        <div className="grid lg:grid-cols-[10px_auto_10px] gap-10">
          <div className="col-start-2">
            <div className="mb-14">
              <h1 className="text-5xl font-bold tracking-tight">My Account</h1>

              <p className="text-lg text-neutral-500 mt-3">
                Manage your profile, orders and account settings.
              </p>
            </div>
            <div className="h-8"></div>

            <div
              className="
              bg-white
              rounded-[32px]
              border
              border-neutral-200
              shadow-sm
              p-10
            "
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
                <div className="h-28 flex items-center gap-4">
                  <div></div>
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
                    <h2 className="text-4xl font-bold">
                      {form.name || "User"}
                    </h2>

                    <div className="mt-6 space-y-4">
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
            <div className="h-8"></div>

            <div>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  to="/orders"
                  className="
                    group
                    bg-white
                    rounded-xl
                    border
                    border-neutral-200
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-lg
                    "
                >
                  <div className="grid lg:grid-cols-[10px_auto_10px] gap-2">
                    <div className="col-start-2">
                      <Package
                        size={34}
                        className="text-black transition group-hover:scale-110"
                      />

                      <h3 className="text-xl font-semibold mt-6">My Orders</h3>

                      <p className="text-neutral-500 mt-2 leading-7">
                        View, track and manage your recent orders.
                      </p>

                      <div className="mt-8 flex items-center gap-2 font-semibold">
                        Open
                        <ArrowRight size={18} />
                      </div>
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
                  <div className="grid lg:grid-cols-[10px_auto_10px] gap-2">
                    <div className="col-start-2">
                      <MapPin
                        size={34}
                        className="text-black transition group-hover:scale-110"
                      />

                      <h3 className="text-xl font-semibold mt-6">Addresses</h3>

                      <p className="text-neutral-500 mt-2 leading-7">
                        Manage saved delivery addresses.
                      </p>

                      <div className="mt-8 flex items-center gap-2 font-semibold">
                        Open
                        <ArrowRight size={18} />
                      </div>
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
                  <div className="grid lg:grid-cols-[10px_auto_10px] gap-2">
                    <div className="col-start-2">
                      <Shield
                        size={34}
                        className="text-black transition group-hover:scale-110"
                      />

                      <h3 className="text-xl font-semibold mt-6">Security</h3>

                      <p className="text-neutral-500 mt-2 leading-7">
                        Update your password and account security.
                      </p>

                      <div className="mt-8 flex items-center gap-2 font-semibold">
                        Open
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="h-8"></div>

              <div
                className="
                mt-12
                bg-white
                rounded-[16px]
                border
                border-neutral-200
                shadow-sm
                p-10
              "
              >
                <div className="grid lg:grid-cols-[10px_auto_10px] gap-2">
                  <div className="col-start-2">
                    <div className="h-2"></div>
                    <h2 className=" text-3xl font-bold">
                      Personal Information
                    </h2>

                    <p className="text-neutral-500 mt-2">
                      Keep your account information up to date.
                    </p>
                    <div className="h-3"></div>

                    <div className="grid md:grid-cols-2 gap-8 mt-10">
                      <div>
                        <label className="block font-medium mb-3">
                          Full Name
                        </label>

                        <div className="flex items-center justify-center">
                          <User size={18} className="w-10 h-7 pt-10" />

                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="
            w-full
            h-14
            rounded-2xl
            border
            border-neutral-300
            pl-14
            pr-5
            outline-none
            transition
            focus:border-black
            focus:ring-4
            focus:ring-neutral-100
          "
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium mb-3">
                          Email Address
                        </label>

                        <div className="flex items-center justify-center">
                          <Mail size={18} className="w-10 h-7 pt-10" />

                          <input
                            value={form.email}
                            disabled
                            className="
            w-full
            h-14
            rounded-2xl
            border
            border-neutral-200
            bg-neutral-100
            pl-14
            pr-5
            text-neutral-500
          "
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-medium mb-3">
                          Phone Number
                        </label>

                        <div className="flex items-center justify-center">
                          <Phone size={18} className="w-10 h-7 pt-10" />

                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="
                            w-full
                            h-14
                            rounded-2xl
                            border
                            border-neutral-300
                            pl-14
                            pr-5
                            outline-none
                            transition
                            focus:border-black
                            focus:ring-4
                            focus:ring-neutral-100
                          "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="h-3"></div>

                    <div className="mt-12">
                      <div
                        className="
                        bg-white
                      "
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                          <div>
                            <h2 className="text-3xl font-bold">
                              Save Your Changes
                            </h2>

                            <p className="text-neutral-500 mt-3 leading-7">
                              Your profile information helps us personalize your
                              shopping experience and keep your account updated.
                            </p>
                          </div>

                          <button
                            onClick={saveProfile}
                            className="
                            w-44
                            h-16
                            px-10
                            rounded-2xl
                            bg-black
                            text-white
                            font-semibold
                            text-lg
                            flex
                            items-center
                            justify-center
                            gap-3
                            transition-all
                            duration-300
                            hover:bg-neutral-800
                            hover:-translate-y-1
                            active:scale-[0.98]
                          "
                          >
                            <Save size={20} />
                            Save Changes
                          </button>
                        </div>
                      </div>
                      <div className="h-3"></div>

                      <div
                        className="
                        bg-white
                      "
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                          <div>
                            <h2 className="text-3xl font-bold text-red-600">
                              Logout
                            </h2>

                            <p className="text-neutral-500 mt-3 leading-7 max-w-xl">
                              Logging out will end your current session. You'll
                              need to sign in again to access your account and
                              orders.
                            </p>
                          </div>

                          <button
                            onClick={handleLogout}
                            className="
                            h-16
                            w-44
                            px-10
                            rounded-2xl
                            border-2
                            border-red-500
                            text-red-600
                            font-semibold
                            text-lg
                            flex
                            items-center
                            justify-center
                            gap-3
                            transition-all
                            duration-300
                            hover:bg-red-500
                            hover:text-white
                          "
                          >
                            <LogOut size={20} />
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="h-2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
