import { initialProducts }
  from "../data/products";

const PRODUCT_KEY =
  "bizzbook_products";

export const getProductsFromStorage =
  () => {
    const data =
      localStorage.getItem(
        PRODUCT_KEY
      );

    return data
      ? JSON.parse(data)
      : initialProducts;
  };

export const saveProductsToStorage =
  (products) => {
    localStorage.setItem(
      PRODUCT_KEY,
      JSON.stringify(products)
    );
  };