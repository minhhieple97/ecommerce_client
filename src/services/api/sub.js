const { get, post, remove, update } = require("./axiosClient");

export const getSubs = () => {
  return get("/sub/list");
};

export const getSub = (slug) => {
  return get(`/sub/${slug}`, null);
};

export const postSub = (data) => {
  return post("/sub", data);
};

export const deleteSub = (slug) => {
  return remove(`/sub/${slug}`);
};

export const updateSub = (slug, data) => {
  return update(`/sub/${slug}`, data);
};
