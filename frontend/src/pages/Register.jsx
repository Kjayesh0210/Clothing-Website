import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import RegisterImage from "../assets/register/register.jpg";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);

      toast.success("Registered Successfully");

      console.log(res.data);

      const redirectTo = location.state?.redirectTo || "/";

      navigate(redirectTo);
    } catch (err) {
      console.log(err);
      toast.error("Failed to register");
    }
  };

  return (
    <section className="min-h-dvh overflow-hidden bg-[#F7F4F2]">
      <div className="mx-auto flex min-h-dvh items-center justify-center px-4 py-4 sm:px-6 lg:px-16 lg:py-0">
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
          lg:grid-cols-[62%_38%]
          "
        >
          {/* Left Side */}
          <div className="flex items-center justify-center p-5 sm:p-8 lg:p-14">
            <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-neutral-400">
                Join THREADDOT
              </p>

              <h2 className="mt-2 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl">
                Create Account
              </h2>

              <p className="mt-3 text-[15px] leading-7 text-neutral-500">
                Create your account and start shopping.
              </p>

              <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
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

              <button
                type="submit"
                className="
                mt-6
                h-14
                w-full
                rounded-xl
                bg-black
                text-[15px]
                font-semibold
                text-white
                transition
                hover:bg-neutral-800
              "
              >
                Create Account
              </button>

              <div className="mt-5 text-center text-sm text-neutral-500 sm:mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-sm text-neutral-500 transition hover:text-black"
                >
                  Already have an account?{" "}
                  <span className="font-medium text-black">Sign In</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="relative hidden overflow-hidden lg:flex">
            <img
              src={RegisterImage}
              alt="Fashion"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent"></div>

            <div className="absolute bottom-8 right-8 z-10">
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

              <p className="mt-1 text-xs uppercase tracking-[0.3em] text-right text-white/80">
                Premium Streetwear
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
