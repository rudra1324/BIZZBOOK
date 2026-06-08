import {
  FaFileInvoiceDollar,
  FaSave,
  FaCheckCircle,
} from "react-icons/fa";

function InvoiceHeader({
  onSave,
  isEditMode = false,
}) {
  const today =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

      {/* Left Section */}

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

          <FaFileInvoiceDollar
            size={24}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-800">

            {isEditMode
              ? "Edit Invoice"
              : "Create Invoice"}

          </h1>

          <p className="text-slate-500 mt-1">

            {isEditMode
              ? "Update invoice details and save changes"
              : "Generate GST compliant professional invoices"}

          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex flex-col lg:items-end gap-3">

        <div className="flex items-center gap-3">

          <div className="bg-slate-100 px-4 py-2 rounded-xl">

            <p className="text-xs text-slate-500">
              Date
            </p>

            <p className="font-semibold text-slate-700">
              {today}
            </p>

          </div>

          <div className="bg-green-50 px-4 py-2 rounded-xl">

            <p className="text-xs text-green-600">
              Status
            </p>

            <p className="font-semibold text-green-700 flex items-center gap-2">

              <FaCheckCircle size={12} />

              Draft

            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 transition font-medium"
          >
            Save Draft
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition"
          >

            <FaSave />

            {isEditMode
              ? "Update Invoice"
              : "Save Invoice"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default InvoiceHeader;