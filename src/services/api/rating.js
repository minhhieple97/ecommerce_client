const { get, post } = require("./axiosClient");

export const getListRatingProduct = (query) => {
  return get(`/rating/list`, null, { ...query });
};
export const getCurrentRatingProductOfUser = (productId, token) => {
  return get(`/rating/current-user/${productId}`, token);
};
export const createOrUpdateRating = (token, data) => {
  return post("/rating", token, data);
};
