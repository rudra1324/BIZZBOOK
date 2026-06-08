import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate =
    useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem(
        "bizzbook_user"
      )
    ) || {};

  const handleLogout =
    () => {
      localStorage.removeItem(
        "bizzbook_token"
      );

      localStorage.removeItem(
        "bizzbook_user"
      );

      navigate("/login");
    };

  return (
    <header className="h-24 bg-white border-b border-slate-200 px-10 flex justify-between items-center">

      {/* Left Section */}

      <div className="flex flex-col justify-center">

        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Welcome back, {user.name || "User"}
        </p>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-4">

        <div className="hidden lg:flex items-center bg-slate-100 rounded-2xl px-5 py-3 w-[340px]">

          <FaSearch className="text-slate-400 text-sm" />

          <input
            type="text"
            placeholder="Search anything..."
            className="bg-transparent outline-none ml-3 w-full text-sm"
          />

        </div>

        <button className="relative w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition">

          <FaBell
            size={18}
            className="text-slate-600"
          />

          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full"></span>

        </button>

        <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-2xl">

          <FaUserCircle
            size={34}
            className="text-indigo-600"
          />

          <div>

            <p className="font-semibold text-slate-800 leading-none">
              {user.name || "Admin"}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Business Owner
            </p>

          </div>

        </div>

        {/* Logout Button */}

        <button
          onClick={
            handleLogout
          }
          className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-3 rounded-2xl hover:bg-red-100 transition font-medium"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </header>
  );
};

export default Navbar;