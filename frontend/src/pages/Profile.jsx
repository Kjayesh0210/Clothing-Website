import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

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
      </div>
    </div>
  );
}

export default Profile;
