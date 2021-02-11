const { post, get, remove } = require("./axiosClient");

export const postCart = (data) => {
  return post("/user/cart", data);
};

export const getCart = () => {
  return get("/user/cart");
};

export const emptyUserCart = () => {
  return remove("/user/cart");
};
