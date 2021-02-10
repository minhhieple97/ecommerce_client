const { get, update } = require("./axiosClient");

export const adminOrders = async () => {
  return await get("/admin/order/list");
};
export const adminUpdateOrder = async (data) => {
  return await update(`/admin/order`, data);
};
