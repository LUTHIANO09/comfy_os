import api from "./api";

export const getDashboardReport = async (
  period = "today"
) => {
  const response = await api.get(
    `reports/dashboard/?period=${period}`
  );

  return response.data;
};