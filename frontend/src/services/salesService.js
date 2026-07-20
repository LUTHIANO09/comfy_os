import api from "./api";

export const getProductsForSale = async () => {
  const response = await api.get("products/");
  return response.data;
};

export const checkoutSale = async (saleData) => {
  const response = await api.post(
    "sales/checkout/",
    saleData
  );

  return response.data;
};

export const getSales = async (receipt = "", date = "") => {
  const response = await api.get("/sales/", {
    params: {
      receipt,
      date,
    },
  });

  return response.data;
};

export const returnSale = async (saleId, reason = "") => {
  const response = await api.post(
    `/sales/${saleId}/return/`,
    {
      reason,
    }
  );

  return response.data;
};

export const getReturnedSales = async (receipt = "", date = "") => {
  const response = await api.get("/sales/returns/", {
    params: {
      receipt,
      date,
    },
  });

  return response.data;
};