const { get, post, remove } = require("./axiosClient");

export const getWishlist = async (token) => {
  return await get("/wishlist/list", token);
};

export const addToWishlist = async (token, data) => {
  return await post("/wishlist", token, data);
};

export const removeProductInWishlist = async (token, productId) => {
  return await remove(`/wishlist/${productId}`, token);
};
