const { get, update } = require("./axiosClient");

export const adminOrders = () => {
  return get("/admin/order/list");
};
export const adminUpdateOrder = (data) => {
  return update(`/admin/order`, data);
};
