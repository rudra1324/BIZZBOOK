import Customer from "../models/Customer.js";

export const getCustomers =
  async (req, res) => {
    try {
      const customers =
        await Customer.find();

      res.json(customers);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

export const createCustomer =
  async (req, res) => {
    try {
      const customer =
        await Customer.create(req.body);

      res.status(201).json(customer);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

export const updateCustomer =
  async (req, res) => {
    try {
      const customer =
        await Customer.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(customer);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };

export const deleteCustomer =
  async (req, res) => {
    try {
      await Customer.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Customer Deleted",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  };