const { get, post, remove, update } = require("./axiosClient");

export const getCategories = async () => {
  return await get("/category/list");
};

export const getCategory = async (slug) => {
  return await get(`/category/${slug}`);
};

export const postCategory = async (data) => {
  return await post("/category", data);
};

export const deleteCategory = async (slug) => {
  return await remove(`/category/${slug}`);
};

export const updateCategory = async (slug, data) => {
  return await update(`/category/${slug}`, data);
};

export const getCategoryBySubId = async (_id, data) => {
  return await get(`/category/subs/${_id}`, data);
};
