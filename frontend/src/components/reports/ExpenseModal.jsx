import { useState } from "react";

function ExpenseModal({
  isOpen,
  onClose,
  onSave,
}) {
  const [expense, setExpense] =
    useState({
      category: "",
      amount: "",
      notes: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

  if (!isOpen) return null;

  const handleSave = () => {
    if (
      !expense.category ||
      !expense.amount
    ) {
      alert(
        "Please fill required fields"
      );
      return;
    }

    onSave({
      id: Date.now(),
      ...expense,
      amount: Number(
        expense.amount
      ),
    });

    setExpense({
      category: "",
      amount: "",
      notes: "",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl p-6 w-[500px]">

        <h2 className="text-xl font-bold mb-5">
          Add Expense
        </h2>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Category"
            value={expense.category}
            onChange={(e) =>
              setExpense({
                ...expense,
                category:
                  e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) =>
              setExpense({
                ...expense,
                amount:
                  e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            value={expense.date}
            onChange={(e) =>
              setExpense({
                ...expense,
                date:
                  e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="4"
            placeholder="Notes"
            value={expense.notes}
            onChange={(e) =>
              setExpense({
                ...expense,
                notes:
                  e.target.value,
              })
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save Expense
          </button>

        </div>

      </div>

    </div>
  );
}

export default ExpenseModal;