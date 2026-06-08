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

function Register() {
  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

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

  const registerUser =
    async () => {

      setError("");
      setSuccess("");

      if (
        !name ||
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
            "https://bizzbook-c34x.onrender.com/api/auth/register",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                name,
                email,
                password,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {

          setError(
            data.message ||
              "Registration Failed"
          );

          return;
        }

        setSuccess(
          "Account created successfully. Redirecting to Login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);

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

          <div className="px-8 space-y-6 flex-1">

            <div className="flex items-center gap-4">

              <FaFileInvoiceDollar
                size={28}
                className="text-[#6C4CE6]"
              />

              <div>

                <h3 className="font-semibold">
                  GST Billing
                </h3>

                <p className="text-sm text-slate-500">
                  Generate professional invoices instantly.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaBoxes
                size={28}
                className="text-[#6C4CE6]"
              />

              <div>

                <h3 className="font-semibold">
                  Inventory
                </h3>

                <p className="text-sm text-slate-500">
                  Manage products and stock efficiently.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaUsers
                size={28}
                className="text-[#6C4CE6]"
              />

              <div>

                <h3 className="font-semibold">
                  Customers
                </h3>

                <p className="text-sm text-slate-500">
                  Organize customer records securely.
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <FaChartLine
                size={28}
                className="text-[#6C4CE6]"
              />

              <div>

                <h3 className="font-semibold">
                  Reports
                </h3>

                <p className="text-sm text-slate-500">
                  Powerful analytics and business insights.
                </p>

              </div>

            </div>

          </div>

          <div className="border-t border-slate-200 p-5 text-sm text-slate-500">
            Start growing your business today.
          </div>

        </div>

        {/* Right Side */}

        <div className="flex-1 flex items-center justify-center p-12">

          <div className="w-full max-w-xl">

            <div className="text-center mb-10">

              <h2 className="text-5xl font-bold text-slate-800">
                Create Account
              </h2>

              <p className="text-slate-500 mt-3">
                Start your journey with BizzBook
              </p>

            </div>

            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-600 p-4 rounded-xl">
                {success}
              </div>
            )}

            <div className="space-y-5">

              <input
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Full Name"
                className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#6C4CE6]"
              />

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

              <button
                onClick={
                  registerUser
                }
                disabled={
                  loading
                }
                className="w-full bg-[#6C4CE6] hover:bg-[#5d3fe0] text-white py-4 rounded-xl font-semibold transition disabled:opacity-60"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </div>

            <div className="text-center mt-8">

              <span className="text-slate-500">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="ml-2 text-[#6C4CE6] font-semibold"
              >
                Login
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;
