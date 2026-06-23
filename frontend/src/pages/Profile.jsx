import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
function Profile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
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
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
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

      toast.success("Profile Updated");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged Out");

    setTimeout(() => {
      window.location.href = "/";
    }, 100);
  };

  return (
    <div
      className="max-w-xl
w-full mx-auto p-10"
    >
      <h1 className="text-4xl mb-6">My Profile</h1>

      <div className="flex flex-col gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="
          border
          p-3
          "
        />

        <input
          value={form.email}
          disabled
          className="
          border
          p-3
          bg-gray-100
          "
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="
          border
          p-3
          "
        />
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <Link
            to="/orders"
            className="
    border
    rounded-lg
    p-5
    hover:shadow-lg
    transition
    "
          >
            <h3 className="text-lg font-semibold">My Orders</h3>

            <p className="text-gray-500 mt-1">View and track your orders</p>
          </Link>

          <Link
            to="/addresses"
            className="
    border
    rounded-lg
    p-5
    hover:shadow-lg
    transition
    "
          >
            <h3 className="text-lg font-semibold">Saved Addresses</h3>

            <p className="text-gray-500 mt-1">Manage delivery addresses</p>
          </Link>
        </div>
        <button
          onClick={saveProfile}
          className="
          bg-black
          text-white
          py-3
          "
        >
          Save Changes
        </button>
        <button
          onClick={handleLogout}
          className="
  bg-red-500
  hover:bg-red-600
  text-white
  py-3
  mt-3
  rounded
  transition
  "
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
