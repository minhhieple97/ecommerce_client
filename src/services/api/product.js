const { get, post, remove, update } = require("./axiosClient");

export const getProducts = async (query, token) => {
  return await get(`/product/list`, token, { ...query });
};
export const getProduct = async (slug, token) => {
  return await get(`/product/${slug}`, token);
};

export const postProduct = async (token, data) => {
  return await post("/product", token, data);
};

export const deleteProduct = async (token, slug) => {
  return await remove(`/product/${slug}`, token);
};

export const updateProduct = async (token, slug, data) => {
  return await update(`/product/${slug}`, token, data);
};

export const ratingProduct = async (token, id, data) => {
  return await update(`/product/rating/${id}`, token, data);
};

export const getRelated = async (slug) => {
  return await get(`/product/related/${slug}`);
};
