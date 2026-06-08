import { useState, useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";

function Settings() {
  const [business, setBusiness] =
    useState({
      businessName: "",
      ownerName: "",
      gstin: "",
      phone: "",
      email: "",
      address: "",
      bankName: "",
      accountNumber: "",
      ifsc: "",
      upiId: "",
      logo: "",
    });

  useEffect(() => {
    const savedData =
      JSON.parse(
        localStorage.getItem(
          "bizzbook_business"
        )
      ) || {};

    setBusiness(savedData);
  }, []);

  const handleChange = (e) => {
    setBusiness({
      ...business,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleLogoUpload = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setBusiness((prev) => ({
        ...prev,
        logo: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "bizzbook_business",
      JSON.stringify(business)
    );

    alert(
      "Business Settings Saved"
    );
  };

  return (
    <MainLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Business Settings
          </h1>

          <p className="text-gray-500">
            Manage company information
          </p>
        </div>

        <div className="bg-white rounded-xl border p-6">

          {/* Logo Upload */}

          <div className="mb-8">

            <h2 className="text-xl font-semibold mb-4">
              Company Logo
            </h2>

            <div className="flex items-center gap-6">

              {business.logo ? (
                <img
                  src={business.logo}
                  alt="Logo"
                  className="w-24 h-24 rounded-xl border object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl border flex items-center justify-center text-gray-400">
                  No Logo
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleLogoUpload
                }
              />

            </div>

          </div>

          {/* Business Details */}

          <div className="grid grid-cols-2 gap-5">

            <input
              name="businessName"
              placeholder="Business Name"
              value={
                business.businessName ||
                ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="ownerName"
              placeholder="Owner Name"
              value={
                business.ownerName ||
                ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="gstin"
              placeholder="GSTIN"
              value={
                business.gstin || ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="phone"
              placeholder="Phone"
              value={
                business.phone || ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="email"
              placeholder="Email"
              value={
                business.email || ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="upiId"
              placeholder="UPI ID"
              value={
                business.upiId || ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="bankName"
              placeholder="Bank Name"
              value={
                business.bankName ||
                ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="accountNumber"
              placeholder="Account Number"
              value={
                business.accountNumber ||
                ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

            <input
              name="ifsc"
              placeholder="IFSC Code"
              value={
                business.ifsc || ""
              }
              onChange={
                handleChange
              }
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            name="address"
            placeholder="Business Address"
            value={
              business.address || ""
            }
            onChange={
              handleChange
            }
            rows="4"
            className="w-full border rounded-lg p-3 mt-5"
          />

          <div className="flex justify-end mt-5">

            <button
              onClick={
                saveSettings
              }
              className="bg-blue-600 text-white px-5 py-3 rounded-lg"
            >
              Save Settings
            </button>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Settings;