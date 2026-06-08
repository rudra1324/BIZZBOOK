const STORAGE_KEY =
  "bizzbook_customers";

export const getCustomersFromStorage =
  () => {
    const data =
      localStorage.getItem(
        STORAGE_KEY
      );

    return data
      ? JSON.parse(data)
      : [];
  };

export const saveCustomersToStorage =
  (customers) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(customers)
    );
  };