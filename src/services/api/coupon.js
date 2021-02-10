const { get, post, remove } = require("./axiosClient");

export const getCoupons = async () => {
  return await get(`/coupon/list`, null);
};
export const removeCoupon = async (id) => {
  return await remove(`/coupon/${id}`);
};

export const postCoupon = async (data) => {
  return await post("/coupon", data);
};
