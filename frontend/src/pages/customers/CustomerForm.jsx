function CustomerForm({
  formData,
  setFormData,
}) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const inputStyle =
    "w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <div className="space-y-8">

      {/* Basic Information */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Basic Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Customer Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className={inputStyle}
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Customer Type
            </label>

            <select
              name="customerType"
              value={
                formData.customerType ||
                "Individual"
              }
              onChange={handleChange}
              className={inputStyle}
            >
              <option>
                Individual
              </option>

              <option>
                Business
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Contact Details */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Contact Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Phone Number *
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className={inputStyle}
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="customer@email.com"
              className={inputStyle}
            />

          </div>

        </div>

      </div>

      {/* Tax Information */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Tax Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              GSTIN
            </label>

            <input
              type="text"
              name="gstin"
              value={
                formData.gstin || ""
              }
              onChange={handleChange}
              placeholder="22AAAAA0000A1Z5"
              className={inputStyle}
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              State
            </label>

            <input
              type="text"
              name="state"
              value={
                formData.state || ""
              }
              onChange={handleChange}
              placeholder="Uttar Pradesh"
              className={inputStyle}
            />

          </div>

        </div>

      </div>

      {/* Address */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Billing Address
        </h3>

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter complete billing address"
          rows="5"
          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />

      </div>

    </div>
  );
}

export default CustomerForm;