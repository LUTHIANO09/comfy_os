import api from "./api";

// Login
export const login = async (username, password) => {
  const response = await api.post("token/", {
    username,
    password,
  });

  return response.data;
};

// Refresh token
export const refreshToken = async (refresh) => {
  const response = await api.post("token/refresh/", {
    refresh,
  });

  return response.data;
};