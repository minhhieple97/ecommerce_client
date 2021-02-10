const { post, get, remove } = require("./axiosClient");

export const postCart = async (data) => {
  return await post("/user/cart", data);
};

export const getCart = async () => {
  return await get("/user/cart");
};

export const emptyUserCart = async () => {
  return await remove("/user/cart");
};
