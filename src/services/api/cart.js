const { post, get, remove } = require("./axiosClient");

export const postCart = (token, data) => {
  return post("/user/cart", token, data);
};

export const getCart = (token) => {
  return get("/user/cart", token);
};

export const emptyUserCart = (token) => {
  return remove("/user/cart", token);
};
