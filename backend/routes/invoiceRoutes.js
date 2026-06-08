import express from "express";

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  collectPayment,
} from "../controllers/invoiceController.js";

const router =
  express.Router();

router.get(
  "/",
  getInvoices
);

router.post(
  "/",
  createInvoice
);

router.put(
  "/:id",
  updateInvoice
);

router.delete(
  "/:id",
  deleteInvoice
);

router.post(
  "/:id/payment",
  collectPayment
);

export default router;