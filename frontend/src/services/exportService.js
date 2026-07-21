import api from "./api";

export const exportSalesCSV = async (receipt = "", date = "") => {
  const response = await api.get("sales/export/csv/", {
    params: {
      receipt,
      date,
    },
    responseType: "blob",
  });

  return response.data;
};