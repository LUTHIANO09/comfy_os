import api from "./api";

export const getInventory = async () => {
  const response = await api.get("inventory/");
  return response.data.results;
};

export const addStock = async (id, quantity, note = "") => {
  const response = await api.post(
    `inventory/inventory/${id}/add-stock/`,
    {
      quantity,
      note,
    }
  );

  return response.data;
};

export const removeStock = async (id, quantity, note = "") => {
  const response = await api.post(
    `inventory/inventory/${id}/remove-stock/`,
    {
      quantity,
      note,
    }
  );

  return response.data;
};

export const getStockMovements = async () => {
  const response = await api.get("inventory/movements/");
  return response.data.results;
};

