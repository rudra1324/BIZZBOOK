import { useState } from "react";

import { FaSearch } from "react-icons/fa";

import {
  getCustomersFromStorage,
} from "../../utils/customerStorage";

function CustomerSelectorModal({
  isOpen,
  onClose,
  onSelect,
}) {
  const [search, setSearch] =
    useState("");

  if (!isOpen) return null;

  const customers =
    getCustomersFromStorage();

  const filteredCustomers =
    customers.filter(
      (customer) =>
        customer.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        customer.phone?.includes(
          search
        ) ||
        customer.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="p-6 border-b">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Select Customer
              </h2>

              <p className="text-slate-500 mt-1">
                Choose a customer for this invoice
              </p>

            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200"
            >
              ✕
            </button>

          </div>

        </div>

        {/* Search */}

        <div className="p-6 border-b">

          <div className="flex items-center bg-slate-100 rounded-2xl px-4 py-3">

            <FaSearch className="text-slate-400" />

            <input
              type="text"
              placeholder="Search customer..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-transparent outline-none ml-3 w-full"
            />

          </div>

        </div>

        {/* Customer List */}

        <div className="max-h-[450px] overflow-y-auto p-6">

          {filteredCustomers.length ===
          0 ? (

            <div className="text-center py-12">

              <h3 className="text-lg font-semibold text-slate-700">
                No Customer Found
              </h3>

              <p className="text-slate-500 mt-2">
                Add customers first from customer section.
              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {filteredCustomers.map(
                (customer) => (
                  <div
                    key={
                      customer.id
                    }
                    onClick={() => {
                      onSelect(
                        customer
                      );
                      onClose();
                    }}
                    className="border border-slate-200 rounded-2xl p-5 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
                  >

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="font-bold text-lg text-slate-800">
                          {
                            customer.name
                          }
                        </h3>

                        <p className="text-slate-500 mt-1">
                          📞{" "}
                          {
                            customer.phone
                          }
                        </p>

                        {customer.email && (
                          <p className="text-slate-500">
                            ✉️{" "}
                            {
                              customer.email
                            }
                          </p>
                        )}

                        {customer.address && (
                          <p className="text-slate-500">
                            📍{" "}
                            {
                              customer.address
                            }
                          </p>
                        )}

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default CustomerSelectorModal;