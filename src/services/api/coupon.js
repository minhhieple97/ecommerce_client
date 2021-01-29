const { get, post, remove } = require("./axiosClient");

export const getCoupons = async () => {
  return await get(`/coupon/list`, null);
};
export const removeCoupon = async (id, token) => {
  return await remove(`/coupon/${id}`, token);
};

export const postCoupon = async (token, data) => {
  return await post("/coupon", token, data);
};
