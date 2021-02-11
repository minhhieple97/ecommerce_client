const { get, post, remove, update } = require("./axiosClient");

export const getCategories = () => {
  return get("/category/list");
};

export const getCategory = (slug) => {
  return get(`/category/${slug}`);
};

export const postCategory = (data) => {
  return post("/category", data);
};

export const deleteCategory = (slug) => {
  return remove(`/category/${slug}`);
};

export const updateCategory = (slug, data) => {
  return update(`/category/${slug}`, data);
};

export const getCategoryBySubId = (_id, data) => {
  return get(`/category/subs/${_id}`, data);
};
