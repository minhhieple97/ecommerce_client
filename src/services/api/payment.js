const { post } = require("./axiosClient");
export const createPaymentIntent = (data) => {
  return post(`/payment/create-payment-intent`, data);
};
