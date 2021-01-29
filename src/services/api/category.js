

const { get, post, remove, update } = require("./axiosClient");

export const getCategories = async (token) => {
  return await get("/category/list", token);
};

export const getCategory = async (slug) => {
  return await get(`/category/${slug}`, null);
};

export const postCategory = async (token, data) => {
  return await post("/category", token, data);
};

export const deleteCategory = async (token, slug) => {
  return await remove(`/category/${slug}`, token);
};

export const updateCategory = async (token, slug, data) => {
  return await update(`/category/${slug}`, token, data);
};

export const getCategoryBySubId = async (token, _id, data) => {
  return await get(`/category/subs/${_id}`, token, data);
};
