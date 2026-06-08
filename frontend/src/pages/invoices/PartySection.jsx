import { useState } from "react";
import CustomerSelectorModal from "./CustomerSelectorModal";

function PartySection({
  selectedCustomer,
  setSelectedCustomer,
}) {
  const [openModal, setOpenModal] =
    useState(false);

  return (
    <>
      <div className="bg-white rounded-xl p-5 border">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-semibold">
            Bill To
          </h2>

          {selectedCustomer && (
            <button
              onClick={() =>
                setOpenModal(true)
              }
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Change Customer
            </button>
          )}

        </div>

        {!selectedCustomer ? (
          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="border-2 border-dashed w-full py-8 rounded-lg text-blue-600"
          >
            + Add Customer
          </button>
        ) : (
          <div className="border rounded-lg p-4">

            <h3 className="font-bold text-lg">
              {selectedCustomer.name}
            </h3>

            <p className="text-gray-600">
              {selectedCustomer.phone}
            </p>

            {selectedCustomer.email && (
              <p className="text-gray-600">
                {selectedCustomer.email}
              </p>
            )}

            <p className="text-gray-600">
              {selectedCustomer.address}
            </p>

          </div>
        )}

      </div>

      <CustomerSelectorModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSelect={(customer) => {
          setSelectedCustomer(
            customer
          );

          setOpenModal(false);
        }}
      />
    </>
  );
}

export default PartySection;