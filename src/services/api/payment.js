const { post } = require("./axiosClient");
export const createPaymentIntent = async (data) => {
  return await post(`/payment/create-payment-intent`, data);
};
