import { useState, useEffect } from "react";

import {
  FaTimes,
  FaBoxOpen,
  FaEdit,
} from "react-icons/fa";

import ProductForm from "./ProductForm";

function ProductModal({
  isOpen,
  onClose,
  onSave,
  selectedProduct,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      hsn: "",
      gst: 18,
      price: "",
      stock: "",
    });

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name:
          selectedProduct.name || "",
        hsn:
          selectedProduct.hsn || "",
        gst:
          selectedProduct.gst || 18,
        price:
          selectedProduct.price || "",
        stock:
          selectedProduct.stock || "",
      });
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const resetForm = () => {
    setFormData({
      name: "",
      hsn: "",
      gst: 18,
      price: "",
      stock: "",
    });

    setError("");
  };

  if (!isOpen) return null;

  const handleSave = () => {
const productName =
formData.name.trim();

const hsn =
formData.hsn.trim();

const gst =
Number(formData.gst);

const price =
Number(formData.price);

const stock =
Number(formData.stock);

// Product Name Validation

if (!productName) {
setError(
"Product name is required"
);
return;
}

if (
!/^[a-zA-Z0-9\s-&()]+$/.test(
productName
)
) {
setError(
"Product name contains invalid characters"
);
return;
}

// HSN Validation

if (
hsn &&
!/^[A-Z0-9]{4,8}$/i.test(
hsn
)
) {
setError(
"HSN/SAC code must be 4-8 alphanumeric characters"
);
return;
}

// GST Validation

if (
isNaN(gst) ||
gst < 0 ||
gst > 100
) {
setError(
"GST must be between 0 and 100"
);
return;
}

// Price Validation

if (
isNaN(price) ||
price <= 0
) {
setError(
"Selling price must be greater than 0"
);
return;
}

// Stock Validation

if (
isNaN(stock) ||
stock < 0
) {
setError(
"Stock quantity cannot be negative"
);
return;
}

setError("");

onSave({
...formData,
gst,
price,
stock,
});

resetForm();

onClose();
};


  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="px-8 py-6 border-b flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

              {selectedProduct ? (
                <FaEdit className="text-indigo-600 text-xl" />
              ) : (
                <FaBoxOpen className="text-indigo-600 text-xl" />
              )}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                {selectedProduct
                  ? "Edit Product"
                  : "Add Product"}

              </h2>

              <p className="text-slate-500 mt-1">

                {selectedProduct
                  ? "Update product details"
                  : "Create a new inventory item"}

              </p>

            </div>

          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          {error && (

            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl">
              {error}
            </div>

          )}

          <ProductForm
            formData={formData}
            setFormData={setFormData}
          />

        </div>

        {/* Footer */}

        <div className="border-t px-8 py-5 flex justify-end gap-3">

          <button
            onClick={handleClose}
            className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-sm transition"
          >

            {selectedProduct
              ? "Update Product"
              : "Save Product"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductModal;
