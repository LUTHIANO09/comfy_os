import api from "./api";

export const getProducts = async () => {
  const response = await api.get("products/");
  return response.data;
};

export const createProduct = async (product) => {
  const form = new FormData();

  Object.entries(product).forEach(([key, value]) => {
    if (
      value !== null &&
      value !== undefined &&
      value !== ""
    ) {
      form.append(key, value);
    }
  });

  const response = await api.post(
    "products/",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const deleteProduct = async (id) => {
  const response = await api.delete(`products/${id}/`);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const form = new FormData();

Object.entries(product).forEach(([key, value]) => {
  if (
    value !== null &&
    value !== undefined &&
    value !== ""
  ) {
    // Only send image if user selected a new file
    if (key === "image" && !(value instanceof File)) {
      return;
    }

    form.append(key, value);
  }
});


  const response = await api.put(
    `products/${id}/`,
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
