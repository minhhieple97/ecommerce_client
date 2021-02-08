const { get, update } = require("./axiosClient");

export const adminOrders = (token) => {
    return get("/admin/order/list", token);
};
export const adminUpdateOrder = (token, data) => {
    return update(`/admin/order`, token, data);
};
