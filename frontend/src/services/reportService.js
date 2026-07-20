import api from "./api";

export const getDashboardReport = async (
  period = "today",
  startDate = "",
  endDate = ""
) => {
  const response = await api.get("reports/dashboard/", {
    params: {
      period,
      start_date: startDate,
      end_date: endDate,
    },
  });

  return response.data;
};