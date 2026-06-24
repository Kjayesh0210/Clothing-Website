import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (form.password !== form.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const res = await api.post(`/auth/reset-password/${token}`, {
        password: form.password,
      });

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="shadow-lg p-8 w-96">
        <h2 className="text-2xl mb-5">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="border p-2 w-full mb-3"
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          className="border p-2 w-full mb-4"
          required
        />

        <button
          disabled={!form.password || form.password !== form.confirmPassword}
          className="
    bg-black
    text-white
    p-2
    w-full
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
