function ProductForm({
formData,
setFormData,
}) {
const handleChange = (e) => {
let {
name,
value,
} = e.target;

```
// Product Name
if (name === "name") {
  value = value.replace(
    /[^a-zA-Z0-9\s\-&().]/g,
    ""
  );
}

// HSN / SAC Code
if (name === "hsn") {
  value = value
    .toUpperCase()
    .replace(
      /[^A-Z0-9]/g,
      ""
    )
    .slice(0, 8);
}

// GST %
if (name === "gst") {
  value = value.replace(
    /[^0-9]/g,
    ""
  );

  value =
    value === ""
      ? ""
      : Number(value);

  if (value > 100) {
    value = 100;
  }
}

// Price
if (name === "price") {
  if (
    value !== "" &&
    Number(value) < 0
  ) {
    value = 0;
  }
}

// Stock
if (name === "stock") {
  if (
    value !== "" &&
    Number(value) < 0
  ) {
    value = 0;
  }
}

setFormData({
  ...formData,
  [name]: value,
});
```

};

const inputStyle =
"w-full h-12 px-4 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

return ( <div className="space-y-8">

```
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
          maxLength={8}
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
          min="0"
          max="100"
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
          min="0"
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
        min="0"
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
```

);
}

export default ProductForm;
