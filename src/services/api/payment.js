const { post } = require("./axiosClient");
export const createPaymentIntent = async (token, data) => {
  return await post(`/payment/create-payment-intent`, token, data);
};
