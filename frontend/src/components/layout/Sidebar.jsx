import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBox,
  FaFileInvoiceDollar,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: <FaUsers />,
  },
  {
    name: "Inventory",
    path: "/products",
    icon: <FaBox />,
  },
  {
    name: "Invoices",
    path: "/invoices",
    icon: <FaFileInvoiceDollar />,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <FaChartBar />,
  },
  {
    name: "Business Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

function Sidebar() {
  const navigate =
    useNavigate();

  const business =
    JSON.parse(
      localStorage.getItem(
        "bizzbook_business"
      )
    ) || {};

  return (
    <div className="w-80 h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Header */}

      <div className="px-6 py-6 border-b border-slate-800">

        <div className="flex items-center gap-4">

          {business.logo ? (
            <img
              src={business.logo}
              alt="Logo"
              className="w-11 h-11 rounded-xl object-cover"
            />
          ) : (
            <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
              BB
            </div>
          )}

          <div>

            <h2 className="font-bold text-lg">
              {business.businessName ||
                "BizzBook"}
            </h2>

            <p className="text-xs text-slate-400">
              Business Management
            </p>

          </div>

        </div>

      </div>

      {/* Create Invoice */}

      <div className="px-5 py-5">

        <button
          onClick={() =>
            navigate(
              "/create-invoice"
            )
          }
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3.5 rounded-2xl font-semibold transition-all"
        >
          + Create Invoice
        </button>

      </div>

      {/* Menu */}

      <div className="flex-1 px-4">

        <p className="text-xs text-slate-500 uppercase tracking-wider px-4 mb-4">
          Main Menu
        </p>

        <ul className="space-y-2">

          {menuItems.map(
            (item) => (
              <li
                key={item.name}
              >
                <NavLink
                  to={item.path}
                  className={({
                    isActive,
                  }) =>
                    `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "hover:bg-slate-800 text-slate-300"
                    }`
                  }
                >

                  <span className="text-base">
                    {item.icon}
                  </span>

                  <span className="font-medium">
                    {item.name}
                  </span>

                </NavLink>

              </li>
            )
          )}

        </ul>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-6">

        <div className="bg-slate-800 rounded-2xl p-4">

          <h3 className="font-semibold">
            BizzBook v1.0
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            Developed by Mradul Raj
          </p>

        </div>

      </div>

    </div>
  );
}

export default Sidebar;