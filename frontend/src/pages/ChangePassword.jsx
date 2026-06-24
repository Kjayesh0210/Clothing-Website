import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const token = localStorage.getItem("token");

      const res = await api.put(
        "/auth/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      toast.success(res.data.message);

      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Change Password</h1>

      <form onSubmit={handleSubmit} className="border rounded-lg p-6">
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={(e) =>
              setForm({
                ...form,
                currentPassword: e.target.value,
              })
            }
            className="border p-3 w-full"
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={form.newPassword}
            onChange={(e) =>
              setForm({
                ...form,
                newPassword: e.target.value,
              })
            }
            className="border p-3 w-full"
            required
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({
                ...form,
                confirmPassword: e.target.value,
              })
            }
            className="border p-3 w-full"
            required
          />

          <button
            type="submit"
            className="
            bg-black
            text-white
            py-3
            w-full
            rounded
            "
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
