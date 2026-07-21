import api from "./api";

export const getSettings = async () => {
  const response = await api.get("/settings/");

  const data = response.data;

  if (data.logo) {
    data.logo = `http://127.0.0.1:8000${data.logo}`;
  }

  return data;
};

export const updateSettings = async (data) => {
  const response = await api.put("/settings/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};