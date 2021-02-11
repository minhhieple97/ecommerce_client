const { post, get, update } = require("./axiosClient");

export const addAddress = (data) => {
  return post("/user/address", data);
};

export const applyCoupon = (data) => {
  return post("/user/cart/coupon", data);
};

export const createOrder = (data) => {
  return post("/user/order", data);
};

export const createCashOrder = (data) => {
  return post("/user/cash-order", data);
};

export const getOrders = () => {
  return get("/user/order");
};

export const getWishlist = () => {
  return get("/user/wishlist");
};

export const addToWishlist = (data) => {
  return post("/user/wishlist", data);
};

export const removeWishlist = (productId) => {
  return update(`/user/wishlist/${productId}`);
};
