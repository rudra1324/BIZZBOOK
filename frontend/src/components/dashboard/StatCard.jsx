import {
  FaRupeeSign,
  FaFileInvoice,
  FaBox,
  FaExclamationTriangle,
} from "react-icons/fa";

const icons = {
  "Total Revenue": (
    <FaRupeeSign />
  ),
  Revenue: (
    <FaRupeeSign />
  ),
  Invoices: (
    <FaFileInvoice />
  ),
  Products: (
    <FaBox />
  ),
  "Low Stock": (
    <FaExclamationTriangle />
  ),
};

const StatCard = ({
  title,
  amount,
  bgColor,
}) => {
  return (
    <div
      className={`${bgColor} rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300`}
    >

      <div className="flex items-center justify-between mb-6">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-2">
            {title ===
            "Total Revenue"
              ? `₹ ${amount}`
              : amount}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-xl text-indigo-600 shadow-sm">

          {icons[title]}

        </div>

      </div>

    </div>
  );
};

export default StatCard;