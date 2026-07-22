import api from "./api";

/*
==========================
Staff
==========================
*/

export const getUsers = async () => {
  const response = await api.get(
    "accounts/users/"
  );

  return response.data.results;
};

export const createUser = async (
  user
) => {
  const response = await api.post(
    "accounts/users/",
    user
  );

  return response.data;
};

export const updateUser = async (
  id,
  user
) => {
  const response = await api.put(
    `accounts/users/${id}/`,
    user
  );

  return response.data;
};

export const deleteUser = async (
  id
) => {
  const response = await api.delete(
    `accounts/users/${id}/`
  );

  return response.data;
};