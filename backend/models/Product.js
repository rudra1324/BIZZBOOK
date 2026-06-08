import mongoose from "mongoose";

const productSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      name: {
        type: String,
        required: true,
      },

      hsn: {
        type: String,
        default: "",
      },

      gst: {
        type: Number,
        default: 18,
      },

      price: {
        type: Number,
        required: true,
      },

      stock: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Product",
  productSchema
);