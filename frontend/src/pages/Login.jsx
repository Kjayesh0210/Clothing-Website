import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import LoginImage from "../assets/login/login.jpg";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Success");

      const redirectTo = location.state?.redirectTo || "/";

      window.location.href = redirectTo;
    } catch (err) {
      console.log(err);
      toast.error("Login Failed");
    }
  };

  return (
    <section className="bg-[#F7F4F2]">
      <div className="mx-auto flex min-h-screen items-center justify-center px-8 py-10 lg:px-16">
        <div
          className="
          grid
          w-full
          h-140
          max-w-[1040px]
          overflow-hidden
          rounded-[32px]
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          lg:grid-cols-[38%_62%]
        "
        >
          {/* Left Side */}
          <div className="relative hidden overflow-hidden lg:flex">
            <img
              src={LoginImage}
              alt="Fashion"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"></div>

            <div className="absolute bottom-14 left-1/2 z-10 -translate-x-1/2">
              <h1
                className="
      text-[34px]
      font-black
      tracking-wide
      text-white
      drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
    "
              >
                THREADDOT
              </h1>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-10 sm:p-14 lg:p-16">
            <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                Welcome Back
              </p>

              <h2 className="mt-3 text-5xl font-bold tracking-tight text-neutral-900">
                Sign In
              </h2>
              <div className="h-10"></div>
              <p className="mt-4 text-neutral-500">
                Login to your THREADDOT account.
              </p>

              <div className="mt-10 space-y-5">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-5
                  text-[15px]
                  outline-none
                  transition-all
                  focus:border-black
                  focus:bg-white
                  "
                />
                <div className="h-6"></div>

                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-neutral-50
                  px-5
                  text-[15px]
                  outline-none
                  transition-all
                  focus:border-black
                  focus:bg-white
                "
                />
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-neutral-500 transition hover:text-black"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="
                mt-8
                h-14
                w-full
                rounded-2xl
                bg-black
                text-[15px]
                font-semibold
                text-white
                transition
                hover:bg-neutral-800
              "
              >
                Sign In
              </button>

              <div className="mt-8 text-center text-sm text-neutral-500">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="font-semibold text-black hover:underline"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
