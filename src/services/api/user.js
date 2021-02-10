const { post, get, update } = require("./axiosClient");

export const addAddress = async (data) => {
  return await post("/user/address", data);
};

export const applyCoupon = async (data) => {
  return await post("/user/cart/coupon", data);
};

export const createOrder = async (data) => {
  return await post("/user/order", data);
};

export const createCashOrder = async (data) => {
  return await post("/user/cash-order", data);
};

export const getOrders = async () => {
  return await get("/user/order");
};

export const getWishlist = async () => {
  return await get("/user/wishlist");
};

export const addToWishlist = async (data) => {
  return await post("/user/wishlist", data);
};

export const removeWishlist = async (productId) => {
  return await update(`/user/wishlist/${productId}`);
};
