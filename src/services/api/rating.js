const { get, post } = require("./axiosClient");

export const getListRatingProduct = (query) => {
  return get(`/rating/list`, { ...query });
};
export const getCurrentRatingProductOfUser = (productId) => {
  return get(`/rating/current-user/${productId}`);
};
export const createOrUpdateRating = (data) => {
  return post("/rating", data);
};
