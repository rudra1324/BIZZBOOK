import mongoose from "mongoose";

const paymentSchema =
  new mongoose.Schema({
    amount: Number,
    date: String,
  });

const invoiceSchema =
  new mongoose.Schema(
    {
      invoiceNo: {
        type: String,
        required: true,
      },

      customer: {
        type: Object,
        required: true,
      },

      items: {
        type: Array,
        default: [],
      },

      subtotal: Number,

      gst: Number,

      grandTotal: Number,

      paidAmount: {
        type: Number,
        default: 0,
      },

      dueAmount: {
        type: Number,
        default: 0,
      },

      status: {
        type: String,
        default: "Pending",
      },

      notes: String,

      payments: [paymentSchema],
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Invoice",
  invoiceSchema
);