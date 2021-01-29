const { get, update } = require("./axiosClient");

export const adminOrders = async (token) => {
    return await get("/admin/order/list", token);
};
export const adminUpdateOrder = async (token, data) => {
    return await update(`/admin/order`, token, data);
};
