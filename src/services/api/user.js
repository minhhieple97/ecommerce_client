const { post, get, update } = require("./axiosClient");

export const addAddress = (token, data) => {
  return post("/user/address", token, data);
};

export const applyCoupon = (token, data) => {
  return post("/user/cart/coupon", token, data);
};

export const createOrder = (token, data) => {
  return post("/user/order", token, data);
};

export const createCashOrder = (token, data) => {
  return post("/user/cash-order", token, data);
};

export const getOrders = (token) => {
  return get("/user/order", token);
};

export const getWishlist = (token) => {
  return get("/user/wishlist", token);
};

export const addToWishlist = (token, data) => {
  return post("/user/wishlist", token, data);
};

export const removeWishlist = (token, productId) => {
  return update(`/user/wishlist/${productId}`, token);
};




