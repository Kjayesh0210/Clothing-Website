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
    <div className="bg-[#FAFAFA] flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        {/* Heading */}

        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
            <LockKeyhole size={28} className="text-neutral-900" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Change Password
          </h1>

          <p className="mt-3 text-neutral-500">
            Update your account password to keep your account secure.
          </p>
        </div>

        {/* Card */}

        <div className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
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
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-neutral-300
                  bg-white
                  px-4
                  text-[15px]
                  outline-none
                  transition
                  focus:border-black
                "
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
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-neutral-300
                  bg-white
                  px-4
                  text-[15px]
                  outline-none
                  transition
                  focus:border-black
                "
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
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-neutral-300
                  bg-white
                  px-4
                  text-[15px]
                  outline-none
                  transition
                  focus:border-black
                "
                required
              />
            </div>

            <button
              type="submit"
              className="
                mt-2
                flex
                h-14
                w-full
                items-center
                justify-center
                rounded-full
                bg-neutral-900
                text-[15px]
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-black
              "
            >
              Update Password
            </button>
          </form>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
}

export default ChangePassword;
