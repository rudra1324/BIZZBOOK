import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/authMiddleware.js";
import customerRoutes from "./routes/customerRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/products",
  productRoutes
);
app.use(
  "/api/customers",
  customerRoutes
);
app.use(
  "/api/invoices",
  invoiceRoutes
);

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log(
      "MongoDB Connected Successfully"
    );
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.json({
    message:
      "BizzBook Backend Running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);
app.get(
  "/api/profile",
  protect,
  (req, res) => {
    res.json({
      message:
        "Protected Route Working",

      userId:
        req.user.id,
    });
  }
);
app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server Running On Port ${process.env.PORT}`
    );
  }
);