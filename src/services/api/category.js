

const { get, post, remove, update } = require("./axiosClient");

export const getCategories = (token) => {
  return get("/category/list", token);
};

export const getCategory = (slug) => {
  return get(`/category/${slug}`, null);
};

export const postCategory = (token, data) => {
  return post("/category", token, data);
};

export const deleteCategory = (token, slug) => {
  return remove(`/category/${slug}`, token);
};

export const updateCategory = (token, slug, data) => {
  return update(`/category/${slug}`, token, data);
};

export const getCategoryBySubId = (token, _id, data) => {
  return get(`/category/subs/${_id}`, token, data);
};
