const { post, get, update } = require("./axiosClient");

export const addAddress = async (token, data) => {
  return await post("/user/address", token, data);
};

export const applyCoupon = async (token, data) => {
  return await post("/user/cart/coupon", token, data);
};

export const createOrder = async (token, data) => {
  return await post("/user/order", token, data);
};

export const createCashOrder = async (token, data) => {
  return await post("/user/cash-order", token, data);
};

export const getOrders = async (token) => {
  return await get("/user/order", token);
};

export const getWishlist = async (token) => {
  return await get("/user/wishlist", token);
};

export const addToWishlist = async (token, data) => {
  return await post("/user/wishlist", token, data);
};

export const removeWishlist = async (token, productId) => {
  return await update(`/user/wishlist/${productId}`, token);
};




