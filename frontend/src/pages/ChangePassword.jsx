import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

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
    <section className="min-h-screen bg-[#FAFAFA] py-8 md:py-4">
      <div className="mx-auto flex w-full max-w-xl items-center justify-center px-4 sm:px-6">
        <div className="w-full">
          {/* Header */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 sm:h-16 sm:w-16">
              <LockKeyhole size={28} className="text-neutral-900" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Change Password
            </h1>

            <p className="mt-3 text-sm text-neutral-500 sm:text-base">
              Update your account password to keep your account secure.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Current Password
                </label>

                <input
                  type="password"
                  placeholder="Enter current password"
                  value={form.currentPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      currentPassword: e.target.value,
                    })
                  }
                  className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={form.newPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      newPassword: e.target.value,
                    })
                  }
                  className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="h-14 w-full rounded-xl border border-neutral-300 bg-white px-4 text-[15px] outline-none transition focus:border-black focus:ring-4 focus:ring-neutral-100"
                  required
                />
              </div>

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-black text-[15px] font-semibold text-white transition-all duration-300 hover:bg-neutral-800"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
