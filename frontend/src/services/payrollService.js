import api from "./api";

export const getPayrollRecords = async () => {
  const response = await api.get("/payroll/");
  return response.data;
};

export const runPayroll = async () => {
  const response = await api.post("/payroll/run/");
  return response.data;
};

export const payPayroll = async (id) => {
  const response = await api.post(`/payroll/${id}/pay/`);
  return response.data;
};