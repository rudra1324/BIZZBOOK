import { useState, useEffect } from "react";

import {
  FaTimes,
  FaUserPlus,
  FaUserEdit,
} from "react-icons/fa";

import CustomerForm from "./CustomerForm";

function CustomerModal({
  isOpen,
  onClose,
  onSave,
  selectedCustomer,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      phone: "",
      email: "",
      address: "",
      customerType: "Individual",
      gstin: "",
      state: "",
    });

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (selectedCustomer) {
      setFormData({
        name:
          selectedCustomer.name || "",
        phone:
          selectedCustomer.phone || "",
        email:
          selectedCustomer.email || "",
        address:
          selectedCustomer.address || "",
        customerType:
          selectedCustomer.customerType ||
          "Individual",
        gstin:
          selectedCustomer.gstin || "",
        state:
          selectedCustomer.state || "",
      });
    } else {
      resetForm();
    }
  }, [selectedCustomer]);

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      customerType: "Individual",
      gstin: "",
      state: "",
    });

    setError("");
  };

  if (!isOpen) return null;

  const handleSave = () => {

  const nameRegex =
    /^[A-Za-z\s]+$/;

  const phoneRegex =
    /^[0-9]{10}$/;

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.name.trim()) {
    setError(
      "Customer name is required"
    );
    return;
  }

  if (
    !nameRegex.test(
      formData.name.trim()
    )
  ) {
    setError(
      "Customer name can contain only letters and spaces"
    );
    return;
  }

  if (!formData.phone.trim()) {
    setError(
      "Phone number is required"
    );
    return;
  }

  if (
    !phoneRegex.test(
      formData.phone
    )
  ) {
    setError(
      "Phone number must be exactly 10 digits"
    );
    return;
  }

  if (
    formData.email &&
    !emailRegex.test(
      formData.email
    )
  ) {
    setError(
      "Please enter a valid email address"
    );
    return;
  }

  if (
    formData.gstin &&
    formData.gstin.length !== 15
  ) {
    setError(
      "GSTIN must be 15 characters long"
    );
    return;
  }

  setError("");

  onSave(formData);

  resetForm();

  onClose();
};

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="px-8 py-6 border-b flex justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center">

              {selectedCustomer ? (
                <FaUserEdit
                  className="text-indigo-600"
                />
              ) : (
                <FaUserPlus
                  className="text-indigo-600"
                />
              )}

            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">

                {selectedCustomer
                  ? "Edit Customer"
                  : "Add Customer"}

              </h2>

              <p className="text-slate-500 mt-1">

                {selectedCustomer
                  ? "Update customer details"
                  : "Create a new customer profile"}

              </p>

            </div>

          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
          >
            <FaTimes />
          </button>

        </div>

        {/* Form */}

        <div className="p-8">

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl">
              {error}
            </div>
          )}

          <CustomerForm
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

            {selectedCustomer
              ? "Update Customer"
              : "Save Customer"}

          </button>

        </div>

      </div>

    </div>
  );
}

export default CustomerModal;
