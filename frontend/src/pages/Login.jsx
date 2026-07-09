import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import LoginImage from "../assets/login/login.jpg";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email: form.email.trim(),
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login Successful");

      const redirectTo = location.state?.redirectTo || "/";

      window.location.href = redirectTo;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-dvh overflow-hidden bg-[#F7F4F2]">
      <div className="mx-auto flex h-screen items-center justify-center px-4 lg:px-16">
        <div
          className="
          grid
          w-full
          max-w-[1040px]
          overflow-hidden
          rounded-[28px]
          border
          border-neutral-200
          bg-white
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          lg:min-h-[620px]
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>

            <div className="absolute bottom-8 left-8 z-10">
              <h1
                className="
                text-[34px]
                font-black
                tracking-[0.12em]
                text-white
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]
                select-none
              "
              >
                THREADDOT
              </h1>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-5 sm:p-8 lg:p-14">
            <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
                Welcome Back
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
                Sign In
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-neutral-500">
                Login to your THREADDOT account.
              </p>

              <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  placeholder="Email"
                  className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  px-5
                  text-[15px]
                  outline-none
                  transition-all
                  focus:border-black
                  focus:ring-2
                  focus:ring-black/10
                  "
                />

                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  minLength={6}
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
                  rounded-xl
                  border
                  border-neutral-200
                  bg-white
                  px-5
                  text-[15px]
                  outline-none
                  transition-all
                  focus:border-black
                  focus:ring-2
                  focus:ring-black/10
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
                disabled={loading}
                className="
                mt-6
                sm:mt-8
                h-14
                w-full
                rounded-xl
                bg-black
                text-[15px]
                font-semibold
                text-white
                transition
                hover:bg-neutral-800
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="mt-6 text-center text-sm text-neutral-500 sm:mt-8">
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
