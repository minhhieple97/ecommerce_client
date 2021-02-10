const { get, post, remove, update } = require("./axiosClient");

export const getSubs = async () => {
  return await get("/sub/list");
};

export const getSub = async (slug) => {
  return await get(`/sub/${slug}`, null);
};

export const postSub = async (data) => {
  return await post("/sub", data);
};

export const deleteSub = async (slug) => {
  return await remove(`/sub/${slug}`);
};

export const updateSub = async (slug, data) => {
  return await update(`/sub/${slug}`, data);
};
