import { useState } from "react";
import ProductSelectorModal from "./ProductSelectorModal";

function ItemTable({
  invoiceItems,
  setInvoiceItems,
  isEditMode = false,
}) {
  const [openModal, setOpenModal] =
    useState(false);

  const addProduct = (product) => {
    const existingItem =
      invoiceItems.find(
        (item) =>
          item.id === product.id
      );

    if (existingItem) {
      alert(
        "Product already added to invoice"
      );
      return;
    }

    const newItem = {
      ...product,
      quantity: 1,
      price: product.price,
      gst: product.gst || 18,
      amount: product.price,
    };

    setInvoiceItems((prev) => [
      ...prev,
      newItem,
    ]);
  };

  const updateItem = (
    id,
    field,
    value
  ) => {
    setInvoiceItems((prev) =>
      prev.map((item) => {
        if (item.id !== id)
          return item;

        let newValue =
          Number(value);

        if (
          field === "quantity"
        ) {
          if (
            !isEditMode &&
            newValue > item.stock
          ) {
            alert(
              `Maximum available stock is ${item.stock}`
            );

            newValue =
              item.stock;
          }

          if (
            newValue < 1
          ) {
            newValue = 1;
          }
        }

        const updatedItem = {
          ...item,
          [field]: newValue,
        };

        updatedItem.amount =
          updatedItem.quantity *
          updatedItem.price;

        return updatedItem;
      })
    );
  };

  const deleteItem = (id) => {
    setInvoiceItems((prev) =>
      prev.filter(
        (item) =>
          item.id !== id
      )
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl border overflow-hidden">

        <div className="flex justify-between items-center p-5 border-b">

          <h2 className="text-xl font-semibold">
            Items / Services
          </h2>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Item
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>
                <th className="p-3 text-left">
                  Product
                </th>

                <th className="p-3 text-left">
                  HSN/SAC
                </th>

                <th className="p-3 text-left">
                  Stock
                </th>

                <th className="p-3 text-left">
                  Qty
                </th>

                <th className="p-3 text-left">
                  Price
                </th>

                <th className="p-3 text-left">
                  GST %
                </th>

                <th className="p-3 text-left">
                  GST Amount
                </th>

                <th className="p-3 text-left">
                  Total
                </th>

                <th className="p-3 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {invoiceItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center p-8 text-gray-400"
                  >
                    No Items Added
                  </td>
                </tr>
              ) : (
                invoiceItems.map((item) => {
                  const taxable =
                    item.quantity *
                    item.price;

                  const gstAmount =
                    taxable *
                    ((item.gst || 18) /
                      100);

                  const total =
                    taxable +
                    gstAmount;

                  return (
                    <tr
                      key={item.id}
                      className="border-t"
                    >
                      <td className="p-3">
                        {item.name}
                      </td>

                      <td className="p-3">
                        {item.hsn || "-"}
                      </td>

                      <td className="p-3">
                        <span
                          className={
                            item.stock <= 5
                              ? "text-red-600 font-semibold"
                              : ""
                          }
                        >
                          {item.stock}
                        </span>
                      </td>

                      <td className="p-3">
                        <input
                          type="number"
                          min="1"
                          value={
                            item.quantity
                          }
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "quantity",
                              e.target.value
                            )
                          }
                          className="border rounded-lg px-2 py-1 w-20"
                        />
                      </td>

                      <td className="p-3">
                        <input
                          type="number"
                          value={
                            item.price
                          }
                          onChange={(e) =>
                            updateItem(
                              item.id,
                              "price",
                              e.target.value
                            )
                          }
                          className="border rounded-lg px-2 py-1 w-28"
                        />
                      </td>

                      <td className="p-3">
                        {item.gst || 18}%
                      </td>

                      <td className="p-3">
                        ₹{" "}
                        {gstAmount.toFixed(
                          2
                        )}
                      </td>

                      <td className="p-3 font-medium">
                        ₹{" "}
                        {total.toFixed(
                          2
                        )}
                      </td>

                      <td className="p-3">
                        <button
                          onClick={() =>
                            deleteItem(
                              item.id
                            )
                          }
                          className="text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>

      </div>

      <ProductSelectorModal
        isOpen={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onSelect={addProduct}
      />
    </>
  );
}

export default ItemTable;