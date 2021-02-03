const { get, post } = require("./axiosClient");

export const getListRatingProduct = async (query) => {
  return await get(`/rating/list`, null, { ...query });
};
export const getCurrentRatingProductOfUser = async (productId, token) => {
  return await get(`/rating/current-user/${productId}`, token);
};
export const createOrUpdateRating = async (token, data) => {
  return await post("/rating", token, data);
};
