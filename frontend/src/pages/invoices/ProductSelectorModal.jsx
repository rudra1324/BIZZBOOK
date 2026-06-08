import { useState } from "react";

import { FaSearch } from "react-icons/fa";

import {
  getProductsFromStorage,
} from "../../utils/productStorage";

function ProductSelectorModal({
  isOpen,
  onClose,
  onSelect,
}) {
  const [search, setSearch] =
    useState("");

  if (!isOpen) return null;

  const products =
    getProductsFromStorage();

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.hsn
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="p-6 border-b">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Select Product
              </h2>

              <p className="text-slate-500 mt-1">
                Choose products for invoice
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
              placeholder="Search product..."
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

        {/* Product List */}

        <div className="max-h-[500px] overflow-y-auto p-6">

          {filteredProducts.length ===
          0 ? (

            <div className="text-center py-12">

              <h3 className="text-lg font-semibold text-slate-700">
                No Products Found
              </h3>

              <p className="text-slate-500 mt-2">
                Add products first from inventory section.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {filteredProducts.map(
                (product) => {
                  const outOfStock =
                    product.stock <= 0;

                  const lowStock =
                    product.stock > 0 &&
                    product.stock <= 5;

                  return (
                    <div
                      key={
                        product.id
                      }
                      onClick={() => {
                        if (
                          outOfStock
                        )
                          return;

                        onSelect(
                          product
                        );

                        onClose();
                      }}
                      className={`rounded-2xl border p-5 transition ${
                        outOfStock
                          ? "bg-slate-100 opacity-60 cursor-not-allowed"
                          : "cursor-pointer hover:border-indigo-500 hover:bg-indigo-50"
                      }`}
                    >

                      <div className="flex justify-between items-start">

                        <div>

                          <h3 className="font-bold text-lg text-slate-800">
                            {
                              product.name
                            }
                          </h3>

                          <p className="text-slate-500 text-sm mt-1">
                            HSN:
                            {" "}
                            {product.hsn ||
                              "-"}
                          </p>

                        </div>

                        {outOfStock ? (
                          <span className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full font-medium">
                            Out Of Stock
                          </span>
                        ) : lowStock ? (
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-medium">
                            Low Stock
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                            In Stock
                          </span>
                        )}

                      </div>

                      <div className="mt-5 grid grid-cols-3 gap-3">

                        <div className="bg-slate-50 rounded-xl p-3 text-center">

                          <p className="text-xs text-slate-500">
                            Price
                          </p>

                          <p className="font-bold text-slate-800">
                            ₹
                            {product.price}
                          </p>

                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 text-center">

                          <p className="text-xs text-slate-500">
                            Stock
                          </p>

                          <p className="font-bold text-slate-800">
                            {
                              product.stock
                            }
                          </p>

                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 text-center">

                          <p className="text-xs text-slate-500">
                            GST
                          </p>

                          <p className="font-bold text-slate-800">
                            {product.gst ||
                              18}
                            %
                          </p>

                        </div>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductSelectorModal;