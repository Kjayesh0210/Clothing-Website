import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send reset email",
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="shadow-lg p-8 w-96">
        <h2 className="text-2xl mb-5">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />

        <button
          className="
          bg-black
          text-white
          p-2
          w-full
          "
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
