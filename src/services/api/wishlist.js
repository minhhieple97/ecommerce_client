const { get, post, remove } = require("./axiosClient");

export const getWishlist = () => {
  return get("/wishlist/list");
};

export const addToWishlist = (data) => {
  return post("/wishlist", data);
};

export const removeProductInWishlist = (query) => {
  return remove(`/wishlist`, { ...query });
};

export const checkProductInWishlist = (productId) => {
  return get(`/wishlist/${productId}`);
};
