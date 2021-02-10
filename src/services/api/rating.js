const { get, post } = require("./axiosClient");

export const getListRatingProduct = async (query) => {
  return await get(`/rating/list`, { ...query });
};
export const getCurrentRatingProductOfUser = async (productId) => {
  return await get(`/rating/current-user/${productId}`);
};
export const createOrUpdateRating = async (data) => {
  return await post("/rating", data);
};
