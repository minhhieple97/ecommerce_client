const { get, post, remove, update } = require("./axiosClient");

export const getProducts = async (query) => {
  return await get(`/product/list`, { ...query });
};
export const getProduct = async (slug) => {
  return await get(`/product/${slug}`);
};

export const postProduct = async (data) => {
  return await post("/product", data);
};

export const deleteProduct = async (slug) => {
  return await remove(`/product/${slug}`);
};

export const updateProduct = async (slug, data) => {
  return await update(`/product/${slug}`, data);
};

export const ratingProduct = async (id, data) => {
  return await update(`/product/rating/${id}`, data);
};

export const getRelated = async (slug) => {
  return await get(`/product/related/${slug}`);
};
