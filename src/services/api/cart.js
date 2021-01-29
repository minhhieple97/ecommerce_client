const { post, get, remove } = require("./axiosClient");

export const postCart = async (token, data) => {
  return await post("/user/cart", token, data);
};

export const getCart = async (token) => {
  return await get("/user/cart", token);
};

export const emptyUserCart = async (token) => {
  return await remove("/user/cart", token);
};
