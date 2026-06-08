import Product from "../models/Product.js";

export const getProducts =
  async (req, res) => {
    try {
      const products =
        await Product.find();

      res.json(products);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const createProduct =
  async (req, res) => {
    try {
      const product =
        await Product.create({
          ...req.body,
          user: req.user.id,
        });

      res.status(201).json(
        product
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const updateProduct =
  async (req, res) => {
    try {
      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(product);
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };

export const deleteProduct =
  async (req, res) => {
    try {
      await Product.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Product Deleted",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Server Error",
      });
    }
  };