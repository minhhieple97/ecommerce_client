const { get, post, remove } = require("./axiosClient");

export const getWishlist = (token) => {
  return get("/wishlist/list", token);
};

export const addToWishlist = (token, data) => {
  return post("/wishlist", token, data);
};

export const removeProductInWishlist = (token, productId) => {
  return remove(`/wishlist/${productId}`, token);
};


export const checkProductInWishlist = (token, productId) => {
  return get(`/wishlist/${productId}`, token);
};