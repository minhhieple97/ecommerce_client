const { get, post, remove, update } = require("./axiosClient");

export const getProducts = (query, token) => {
  return get(`/product/list`, token, { ...query });
};
export const getProduct = (slug, token) => {
  return get(`/product/${slug}`, token);
};

export const postProduct = (token, data) => {
  return post("/product", token, data);
};

export const deleteProduct = (token, slug) => {
  return remove(`/product/${slug}`, token);
};

export const updateProduct = (token, slug, data) => {
  return update(`/product/${slug}`, token, data);
};

export const ratingProduct = (token, id, data) => {
  return update(`/product/rating/${id}`, token, data);
};

export const getRelated = (slug) => {
  return get(`/product/related/${slug}`);
};
