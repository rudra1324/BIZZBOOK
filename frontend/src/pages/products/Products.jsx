import { useState, useEffect } from "react";

import MainLayout from "../../components/layout/MainLayout";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

import {
  getProductsFromStorage,
  saveProductsToStorage,
} from "../../utils/productStorage";

function Products() {
  const [openModal, setOpenModal] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  useEffect(() => {
    const storedProducts =
      getProductsFromStorage();

    setProducts(storedProducts);
  }, []);

  const addProduct = (productData) => {
    const newProduct = {
      id: Date.now(),
      ...productData,
      price: Number(productData.price),
      stock: Number(productData.stock),
      gst: Number(productData.gst),
    };

    const updatedProducts = [
      ...products,
      newProduct,
    ];

    setProducts(updatedProducts);

    saveProductsToStorage(
      updatedProducts
    );
  };

  const updateProduct = (
    productData
  ) => {
    const updatedProducts =
      products.map((product) =>
        product.id ===
        selectedProduct.id
          ? {
              ...product,
              ...productData,
              price: Number(
                productData.price
              ),
              stock: Number(
                productData.stock
              ),
              gst: Number(
                productData.gst
              ),
            }
          : product
      );

    setProducts(updatedProducts);

    saveProductsToStorage(
      updatedProducts
    );

    setSelectedProduct(null);
  };

  const deleteProduct = (id) => {
    const updatedProducts =
      products.filter(
        (product) =>
          product.id !== id
      );

    setProducts(updatedProducts);

    saveProductsToStorage(
      updatedProducts
    );
  };

  const handleEdit = (
    product
  ) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const filteredProducts =
    products.filter(
      (product) =>
        product.name
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        product.hsn
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )
    );

  const stockValue =
    products.reduce(
      (sum, product) =>
        sum +
        product.price *
          product.stock,
      0
    );

  const lowStockProducts =
    products.filter(
      (product) =>
        product.stock <= 5
    ).length;

  return (
    <MainLayout>
      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Inventory
            </h1>

            <p className="text-gray-500">
              Manage products and stock
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            + Create Item
          </button>

        </div>

        <div className="grid grid-cols-3 gap-5">

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Stock Value
            </h3>

            <p className="text-3xl font-bold">
              ₹ {stockValue}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Low Stock
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {lowStockProducts}
            </p>
          </div>

          <div className="bg-white border rounded-xl p-5">
            <h3 className="text-gray-500">
              Total Products
            </h3>

            <p className="text-3xl font-bold">
              {products.length}
            </p>
          </div>

        </div>

        <div className="bg-white p-4 rounded-xl border">

          <input
            type="text"
            placeholder="Search item..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <ProductTable
          products={filteredProducts}
          onDelete={deleteProduct}
          onEdit={handleEdit}
        />

        <ProductModal
          isOpen={openModal}
          onClose={() => {
            setOpenModal(false);
            setSelectedProduct(null);
          }}
          onSave={
            selectedProduct
              ? updateProduct
              : addProduct
          }
          selectedProduct={
            selectedProduct
          }
        />

      </div>
    </MainLayout>
  );
}

export default Products;