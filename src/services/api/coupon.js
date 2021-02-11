const { get, post, remove } = require("./axiosClient");

export const getCoupons = () => {
  return get(`/coupon/list`, null);
};
export const removeCoupon = (id) => {
  return remove(`/coupon/${id}`);
};

export const postCoupon = (data) => {
  return post("/coupon", data);
};
