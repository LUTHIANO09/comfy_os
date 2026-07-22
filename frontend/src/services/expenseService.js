import api from "./api";


/*
==========================
Expense Categories
==========================
*/

export const getExpenseCategories = async () => {
  const response = await api.get(
    "expenses/categories/"
  );

  return response.data.results;
};

export const createExpenseCategory = async (
  category
) => {
  const response = await api.post(
    "expenses/categories/",
    category
  );

  return response.data;
};

export const updateExpenseCategory = async (
  id,
  category
) => {
  const response = await api.put(
    `expenses/categories/${id}/`,
    category
  );

  return response.data;
};

export const deleteExpenseCategory = async (
  id
) => {
  await api.delete(
    `expenses/categories/${id}/`
  );
};


/*
==========================
Expenses
==========================
*/

export const getExpenses = async () => {
  const response = await api.get("expenses/");
  return response.data.results;
};

export const createExpense = async (
  expense
) => {
  const response = await api.post(
    "expenses/",
    expense,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};



export const updateExpense = async (
  id,
  expense
) => {
  const response = await api.put(
    `expenses/${id}/`,
    expense,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteExpense = async (
  id
) => {
  await api.delete(
    `expenses/${id}/`
  );
};