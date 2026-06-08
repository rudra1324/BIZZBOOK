export const getExpensesFromStorage =
  () => {
    return (
      JSON.parse(
        localStorage.getItem(
          "bizzbook_expenses"
        )
      ) || []
    );
  };

export const saveExpenseToStorage =
  (expense) => {
    const expenses =
      getExpensesFromStorage();

    expenses.push(expense);

    localStorage.setItem(
      "bizzbook_expenses",
      JSON.stringify(expenses)
    );
  };

export const deleteExpenseFromStorage =
  (id) => {
    const expenses =
      getExpensesFromStorage();

    const updatedExpenses =
      expenses.filter(
        (expense) =>
          expense.id !== id
      );

    localStorage.setItem(
      "bizzbook_expenses",
      JSON.stringify(
        updatedExpenses
      )
    );
  };

export const updateExpenseInStorage =
  (updatedExpense) => {
    const expenses =
      getExpensesFromStorage();

    const updatedExpenses =
      expenses.map(
        (expense) =>
          expense.id ===
          updatedExpense.id
            ? updatedExpense
            : expense
      );

    localStorage.setItem(
      "bizzbook_expenses",
      JSON.stringify(
        updatedExpenses
      )
    );
  };