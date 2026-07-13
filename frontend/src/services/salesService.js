import api from "./api";

export const getProductsForSale = async () => {
  const response = await api.get("products/");
  return response.data;
};