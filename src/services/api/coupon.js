const { get, post, remove } = require("./axiosClient");

export const getCoupons = () => {
  return get(`/coupon/list`, null);
};
export const removeCoupon = (id, token) => {
  return remove(`/coupon/${id}`, token);
};

export const postCoupon = (token, data) => {
  return post("/coupon", token, data);
};
