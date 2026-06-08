import jsPDF from "jspdf";

export const generateInvoicePDF = (
  invoice
) => {
  const doc = new jsPDF();

  const business =
    JSON.parse(
      localStorage.getItem(
        "bizzbook_business"
      )
    ) || {};

  // =========================
  // LOGO
  // =========================

  if (business.logo) {
    try {
      doc.addImage(
        business.logo,
        "PNG",
        15,
        10,
        25,
        25
      );
    } catch (error) {
      console.log(
        "Logo could not be loaded"
      );
    }
  }

  // =========================
  // BUSINESS DETAILS
  // =========================

  doc.setFontSize(20);
  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    business.businessName ||
      "BizzBook",
    50,
    18
  );

  doc.setFontSize(10);
  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Owner: ${
      business.ownerName || "-"
    }`,
    50,
    25
  );

  doc.text(
    `GSTIN: ${
      business.gstin || "-"
    }`,
    50,
    31
  );

  doc.text(
    `Phone: ${
      business.phone || "-"
    }`,
    50,
    37
  );

  doc.text(
    `Email: ${
      business.email || "-"
    }`,
    50,
    43
  );

  doc.text(
    `Address: ${
      business.address || "-"
    }`,
    50,
    49
  );

  // =========================
  // INVOICE INFO
  // =========================

  doc.setFontSize(16);
  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "TAX INVOICE",
    150,
    18
  );

  doc.setFontSize(10);
  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Invoice No: ${invoice.invoiceNo}`,
    135,
    28
  );

  doc.text(
    `Date: ${new Date(
      invoice.createdAt
    ).toLocaleDateString()}`,
    135,
    34
  );

  doc.text(
    `Status: ${
      invoice.status || "Pending"
    }`,
    135,
    40
  );

  // Divider

  doc.line(
    10,
    58,
    200,
    58
  );

  // =========================
  // CUSTOMER DETAILS
  // =========================

  doc.setFontSize(12);
  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Bill To",
    15,
    70
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    invoice.customer?.name ||
      "-",
    15,
    78
  );

  doc.text(
    invoice.customer?.phone ||
      "-",
    15,
    84
  );

  doc.text(
    invoice.customer?.email ||
      "-",
    15,
    90
  );

  doc.text(
    invoice.customer?.address ||
      "-",
    15,
    96
  );

  // =========================
  // ITEMS TABLE
  // =========================

  let y = 112;

  doc.setFillColor(
    230,
    230,
    230
  );

  doc.rect(
    10,
    y - 6,
    190,
    10,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Product",
    15,
    y
  );

  doc.text(
    "Qty",
    95,
    y
  );

  doc.text(
    "Price",
    120,
    y
  );

  doc.text(
    "GST",
    150,
    y
  );

  doc.text(
    "Amount",
    172,
    y
  );

  y += 10;

  doc.setFont(
    "helvetica",
    "normal"
  );

  invoice.items?.forEach(
    (item) => {
      const taxable =
        item.quantity *
        item.price;

      const gstAmount =
        taxable *
        ((item.gst || 18) / 100);

      const total =
        taxable +
        gstAmount;

      doc.text(
        item.name,
        15,
        y
      );

      doc.text(
        String(
          item.quantity
        ),
        95,
        y
      );

      doc.text(
        `₹${item.price}`,
        120,
        y
      );

      doc.text(
        `${item.gst || 18}%`,
        150,
        y
      );

      doc.text(
        `₹${total.toFixed(2)}`,
        172,
        y
      );

      y += 8;
    }
  );

  // =========================
  // TOTALS
  // =========================

  y += 10;

  doc.line(
    120,
    y,
    200,
    y
  );

  y += 8;

  doc.text(
    `Subtotal : ₹${invoice.subtotal?.toFixed(
      2
    )}`,
    130,
    y
  );

  y += 8;

  doc.text(
    `GST : ₹${invoice.gst?.toFixed(
      2
    )}`,
    130,
    y
  );

  y += 8;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    `Grand Total : ₹${invoice.grandTotal?.toFixed(
      2
    )}`,
    130,
    y
  );

  // =========================
  // NOTES
  // =========================

  if (invoice.notes) {
    y += 20;

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.text(
      "Notes",
      15,
      y
    );

    y += 8;

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.text(
      invoice.notes,
      15,
      y
    );
  }

  // =========================
  // BANK DETAILS
  // =========================

  y += 25;

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Bank Details",
    15,
    y
  );

  y += 8;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    `Bank : ${
      business.bankName || "-"
    }`,
    15,
    y
  );

  y += 6;

  doc.text(
    `A/C No : ${
      business.accountNumber ||
      "-"
    }`,
    15,
    y
  );

  y += 6;

  doc.text(
    `IFSC : ${
      business.ifsc || "-"
    }`,
    15,
    y
  );

  y += 6;

  doc.text(
    `UPI : ${
      business.upiId || "-"
    }`,
    15,
    y
  );

  // =========================
  // SIGNATURE
  // =========================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "Authorized Signature",
    130,
    y + 20
  );

  // =========================
  // FOOTER
  // =========================

  doc.setFontSize(9);

  doc.text(
    "Thank you for your business!",
    70,
    285
  );

  doc.save(
    `${invoice.invoiceNo}.pdf`
  );
};