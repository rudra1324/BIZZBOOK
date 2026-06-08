import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaChartLine,
  FaFileInvoiceDollar,
  FaBoxes,
  FaUsers,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

function Login() {
  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const handleLogin =
    async () => {
      setError("");
      setSuccess("");

      if (
        !email ||
        !password
      ) {
        setError(
          "Please fill all fields"
        );
        return;
      }

      try {
        setLoading(true);

        const response =
          await fetch(
            "http://localhost:5000/api/auth/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                {
                  email,
                  password,
                }
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          setError(
            data.message ||
              "Login Failed"
          );

          setLoading(false);
          return;
        }

        localStorage.setItem(
          "bizzbook_token",
          data.token
        );

        localStorage.setItem(
          "bizzbook_user",
          JSON.stringify(
            data.user
          )
        );

        setSuccess(
          "Login successful. Redirecting..."
        );

        setTimeout(() => {
          navigate(
            "/dashboard"
          );
        }, 1200);
      } catch (error) {
        console.error(error);

        setError(
          "Server Connection Error"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f6ff] to-[#eef2ff] flex items-center justify-center p-6">

      <div className="w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex">

        {/* Left Side */}

        <div className="w-[380px] bg-[#f6f2ff] border-r border-slate-200 flex flex-col">

          <div className="p-10 text-center">

            <div className="w-24 h-24 mx-auto rounded-3xl bg-[#6C4CE6] flex items-center justify-center text-white text-5xl font-bold shadow-lg">
              B
            </div>

            <h1 className="text-4xl font-bold text-[#6C4CE6] mt-5">
              BizzBook
            </h1>

            <p className="text-slate-500 mt-2">
              Smart Business Management
            </p>

          </div>

          <div className="px-8 pb-8 flex-1">

            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h2>

            <p className="text-slate-500 mb-6">
              Login to continue
            </p>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 p-3 rounded-xl">
                {success}
              </div>
            )}

            <div className="space-y-4">

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Email Address"
                className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#6C4CE6]"
              />

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  placeholder="Password"
                  className="w-full border border-slate-200 rounded-xl p-4 pr-12 outline-none focus:ring-2 focus:ring-[#6C4CE6]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-4 text-slate-500"
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-slate-600">

                  <input
                    type="checkbox"
                  />

                  Remember Me

                </label>

                <button className="text-[#6C4CE6] font-medium">
                  Forgot Password?
                </button>

              </div>

              <button
                onClick={
                  handleLogin
                }
                disabled={
                  loading
                }
                className="w-full bg-[#6C4CE6] hover:bg-[#5d3fe0] text-white py-4 rounded-xl font-semibold transition disabled:opacity-60"
              >
                {loading
                  ? "Signing In..."
                  : "Login"}
              </button>

            </div>

            <div className="mt-8 text-center">

              <p className="text-slate-500">
                Don't have an account?
              </p>

              <Link
                to="/register"
                className="text-[#6C4CE6] font-semibold"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex-1 p-12 flex flex-col justify-center">

          <div className="text-center mb-12">

            <h2 className="text-5xl font-bold text-slate-800 mb-4">
              Manage Your Business
            </h2>

            <p className="text-lg text-slate-500">
              Billing, Inventory, Customers & Reports
              in one powerful platform.
            </p>

          </div>

          <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">

            {[
              {
                icon:
                  <FaFileInvoiceDollar />,
                title:
                  "Billing",
              },
              {
                icon:
                  <FaBoxes />,
                title:
                  "Products",
              },
              {
                icon:
                  <FaUsers />,
                title:
                  "Customers",
              },
              {
                icon:
                  <FaBoxes />,
                title:
                  "Inventory",
              },
              {
                icon:
                  <FaChartLine />,
                title:
                  "Reports",
              },
              {
                icon:
                  <FaUsers />,
                title:
                  "Settings",
              },
            ].map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="bg-slate-50 rounded-3xl p-8 text-center hover:shadow-lg transition"
                >

                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white flex items-center justify-center text-[#6C4CE6] text-2xl shadow-sm">

                    {
                      item.icon
                    }

                  </div>

                  <h3 className="mt-5 font-semibold text-slate-700">
                    {
                      item.title
                    }
                  </h3>

                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;