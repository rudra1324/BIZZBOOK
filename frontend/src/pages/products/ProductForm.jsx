function ProductForm({
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

      {/* Product Details */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Product Information
        </h3>

        <div className="space-y-5">

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Product Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className={inputStyle}
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              HSN / SAC Code
            </label>

            <input
              type="text"
              name="hsn"
              value={formData.hsn}
              onChange={handleChange}
              placeholder="Enter HSN / SAC Code"
              className={inputStyle}
            />

          </div>

        </div>

      </div>

      {/* Pricing */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Pricing Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              GST %
            </label>

            <input
              type="number"
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              placeholder="18"
              className={inputStyle}
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-600 mb-2">
              Selling Price (₹)
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className={inputStyle}
            />

          </div>

        </div>

      </div>

      {/* Inventory */}

      <div className="bg-slate-50 rounded-2xl p-6">

        <h3 className="text-lg font-semibold text-slate-800 mb-5">
          Inventory Management
        </h3>

        <div>

          <label className="block text-sm font-medium text-slate-600 mb-2">
            Stock Quantity
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock quantity"
            className={inputStyle}
          />

        </div>

      </div>

      {/* Product Preview */}

      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-6 text-white">

        <p className="text-sm opacity-80">
          Product Preview
        </p>

        <h3 className="text-2xl font-bold mt-2">
          {formData.name ||
            "Product Name"}
        </h3>

        <div className="flex gap-8 mt-4">

          <div>

            <p className="text-sm opacity-80">
              Price
            </p>

            <p className="font-bold">
              ₹ {formData.price || 0}
            </p>

          </div>

          <div>

            <p className="text-sm opacity-80">
              GST
            </p>

            <p className="font-bold">
              {formData.gst || 18}%
            </p>

          </div>

          <div>

            <p className="text-sm opacity-80">
              Stock
            </p>

            <p className="font-bold">
              {formData.stock || 0}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductForm;