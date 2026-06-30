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
          lg:grid-cols-[62%_38%]
        "
        >
          {/* Left Side */}
          <div className="flex items-center justify-center p-10 sm:p-14 lg:p-16">
            <form onSubmit={handleSubmit} className="w-full max-w-[420px]">
              <p className="text-sm uppercase tracking-[0.25em] text-neutral-400">
                Join THREADDOT
              </p>

              <h2 className="mt-3 text-5xl font-bold tracking-tight text-neutral-900">
                Create Account
              </h2>
              <div className="lg:h-10"></div>
              <p className="mt-4 text-neutral-500">
                Create your account and start shopping.
              </p>

              <div className="mt-10 space-y-5">
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
                <div className="lg:h-2"></div>
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
                <div className="lg:h-2"></div>
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
                <div className="lg:h-2"></div>
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
                Create Account
              </button>

              <div className="mt-5 flex w-full justify-center">
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10"></div>

            <div className="absolute bottom-14 right-14 z-10">
              <h1 className="text-[34px] font-black tracking-wide text-white">
                THREADDOT
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
