export const saveInvoiceToStorage = (
  invoice
) => {
  const existingInvoices =
    JSON.parse(
      localStorage.getItem(
        "bizzbook_invoices"
      )
    ) || [];

  existingInvoices.push(invoice);

  localStorage.setItem(
    "bizzbook_invoices",
    JSON.stringify(
      existingInvoices
    )
  );
};

export const getInvoicesFromStorage =
  () => {
    return (
      JSON.parse(
        localStorage.getItem(
          "bizzbook_invoices"
        )
      ) || []
    );
  };

export const deleteInvoiceFromStorage = (
  invoiceNo
) => {
  const invoices =
    getInvoicesFromStorage();

  const updatedInvoices =
    invoices.filter(
      (invoice) =>
        invoice.invoiceNo !==
        invoiceNo
    );

  localStorage.setItem(
    "bizzbook_invoices",
    JSON.stringify(
      updatedInvoices
    )
  );
};

export const getInvoiceByNumber = (
  invoiceNo
) => {
  const invoices =
    getInvoicesFromStorage();

  return invoices.find(
    (invoice) =>
      invoice.invoiceNo ===
      invoiceNo
  );
};

export const updateInvoiceInStorage = (
  updatedInvoice
) => {
  const invoices =
    getInvoicesFromStorage();

  const updatedInvoices =
    invoices.map((invoice) =>
      invoice.invoiceNo ===
      updatedInvoice.invoiceNo
        ? updatedInvoice
        : invoice
    );

  localStorage.setItem(
    "bizzbook_invoices",
    JSON.stringify(
      updatedInvoices
    )
  );

  return updatedInvoices;
};

export const duplicateInvoice = (
  invoiceNo
) => {
  const invoice =
    getInvoiceByNumber(
      invoiceNo
    );

  if (!invoice) return null;

  const duplicatedInvoice = {
    ...invoice,

    invoiceNo: `INV-${Date.now()
      .toString()
      .slice(-6)}`,

    createdAt:
      new Date(),

    status: "Pending",

    paidAmount: 0,

    dueAmount:
      invoice.grandTotal,
  };

  saveInvoiceToStorage(
    duplicatedInvoice
  );

  return duplicatedInvoice;
};

export const getInvoiceIndex = (
  invoiceNo
) => {
  const invoices =
    getInvoicesFromStorage();

  return invoices.findIndex(
    (invoice) =>
      invoice.invoiceNo ===
      invoiceNo
  );
};

export const invoiceExists = (
  invoiceNo
) => {
  const invoice =
    getInvoiceByNumber(
      invoiceNo
    );

  return !!invoice;
};

export const updateInvoicePayment = (
  invoiceNo,
  amount
) => {
  const invoices =
    getInvoicesFromStorage();

  const updatedInvoices =
    invoices.map((invoice) => {
      if (
        invoice.invoiceNo !==
        invoiceNo
      ) {
        return invoice;
      }

      const paidAmount =
        (invoice.paidAmount || 0) +
        amount;

      const dueAmount =
        invoice.grandTotal -
        paidAmount;

      let status =
        "Pending";

      if (dueAmount <= 0) {
        status = "Paid";
      } else if (
        paidAmount > 0
      ) {
        status = "Partial";
      }

      return {
        ...invoice,
        paidAmount,
        dueAmount,
        status,
      };
    });

  localStorage.setItem(
    "bizzbook_invoices",
    JSON.stringify(
      updatedInvoices
    )
  );

  return updatedInvoices;
};