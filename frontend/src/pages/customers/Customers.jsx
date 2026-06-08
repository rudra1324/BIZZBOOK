import { useState, useEffect } from "react";

import MainLayout from "../../components/layout/MainLayout";
import CustomerTable from "./CustomerTable";
import CustomerModal from "./CustomerModal";
import CustomerLedgerModal from "./CustomerLedgerModal";

import {
  getCustomersFromStorage,
  saveCustomersToStorage,
} from "../../utils/customerStorage";

function Customers() {
  const [openModal, setOpenModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [customers, setCustomers] =
    useState([]);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [ledgerOpen, setLedgerOpen] =
    useState(false);

  const [ledgerCustomer, setLedgerCustomer] =
    useState(null);

  useEffect(() => {
    const storedCustomers =
      getCustomersFromStorage();

    setCustomers(storedCustomers);
  }, []);

  const addCustomer = (
    customerData
  ) => {
    const newCustomer = {
      id: Date.now(),
      ...customerData,
    };

    const updatedCustomers = [
      ...customers,
      newCustomer,
    ];

    setCustomers(updatedCustomers);

    saveCustomersToStorage(
      updatedCustomers
    );
  };

  const updateCustomer = (
    customerData
  ) => {
    const updatedCustomers =
      customers.map((customer) =>
        customer.id ===
        selectedCustomer.id
          ? {
              ...customer,
              ...customerData,
            }
          : customer
      );

    setCustomers(updatedCustomers);

    saveCustomersToStorage(
      updatedCustomers
    );

    setSelectedCustomer(null);
  };

  const deleteCustomer = (id) => {
    const updatedCustomers =
      customers.filter(
        (customer) =>
          customer.id !== id
      );

    setCustomers(updatedCustomers);

    saveCustomersToStorage(
      updatedCustomers
    );
  };

  const handleEdit = (
    customer
  ) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  };

  const handleLedger = (
    customer
  ) => {
    setLedgerCustomer(customer);
    setLedgerOpen(true);
  };

  const filteredCustomers =
    customers.filter(
      (customer) =>
        customer.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        customer.phone?.includes(
          searchTerm
        ) ||
        customer.email
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  return (
    <MainLayout>

      <div className="space-y-6">

        {/* Hero Section */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white shadow-lg">

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold mb-2">
                Customers
              </h1>

              <p className="text-blue-100">
                Manage your customer database and business relationships.
              </p>

            </div>

            <button
              onClick={() => {
                setSelectedCustomer(
                  null
                );
                setOpenModal(
                  true
                );
              }}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
            >
              + Add Customer
            </button>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500">
              Total Customers
            </p>

            <h2 className="text-4xl font-bold text-indigo-600 mt-2">
              {customers.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500">
              Active Customers
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              {customers.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">

            <p className="text-gray-500">
              Search Results
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {
                filteredCustomers.length
              }
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="bg-white p-5 rounded-2xl border shadow-sm">

          <input
            type="text"
            placeholder="Search by customer name, email or phone..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-full border border-slate-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        {/* Table */}

        <CustomerTable
          customers={
            filteredCustomers
          }
          onDelete={
            deleteCustomer
          }
          onEdit={handleEdit}
          onLedger={
            handleLedger
          }
        />

        <CustomerModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(
              false
            );

            setSelectedCustomer(
              null
            );
          }}
          onSave={
            selectedCustomer
              ? updateCustomer
              : addCustomer
          }
          selectedCustomer={
            selectedCustomer
          }
        />

        <CustomerLedgerModal
          isOpen={ledgerOpen}
          onClose={() => {
            setLedgerOpen(
              false
            );

            setLedgerCustomer(
              null
            );
          }}
          customer={
            ledgerCustomer
          }
        />

      </div>

    </MainLayout>
  );
}

export default Customers;