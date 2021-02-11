const { get, post, remove, update } = require("./axiosClient");

export const getProducts = (query) => {
  return get(`/product/list`, { ...query });
};
export const getProduct = (slug) => {
  return get(`/product/${slug}`);
};

export const postProduct = (data) => {
  return post("/product", data);
};

export const deleteProduct = (slug) => {
  return remove(`/product/${slug}`);
};

export const updateProduct = (slug, data) => {
  return update(`/product/${slug}`, data);
};

export const ratingProduct = (id, data) => {
  return update(`/product/rating/${id}`, data);
};

export const getRelated = (slug) => {
  return get(`/product/related/${slug}`);
};
