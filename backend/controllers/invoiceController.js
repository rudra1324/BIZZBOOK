import Invoice from "../models/Invoice.js";

export const getInvoices =
  async (req, res) => {
    try {
      const invoices =
        await Invoice.find().sort({
          createdAt: -1,
        });

      res.json(invoices);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const createInvoice =
  async (req, res) => {
    try {
      const invoice =
        await Invoice.create(
          req.body
        );

      res.status(201).json(
        invoice
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const updateInvoice =
  async (req, res) => {
    try {
      const invoice =
        await Invoice.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(invoice);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const deleteInvoice =
  async (req, res) => {
    try {
      await Invoice.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Invoice Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const collectPayment =
  async (req, res) => {
    try {
      const invoice =
        await Invoice.findById(
          req.params.id
        );

      const amount =
        Number(
          req.body.amount
        );

      invoice.paidAmount =
        (invoice.paidAmount ||
          0) + amount;

      invoice.dueAmount =
        invoice.grandTotal -
        invoice.paidAmount;

      invoice.payments.push({
        amount,
        date:
          new Date().toLocaleString(),
      });

      if (
        invoice.dueAmount <= 0
      ) {
        invoice.status =
          "Paid";
      } else {
        invoice.status =
          "Partial";
      }

      await invoice.save();

      res.json(invoice);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };