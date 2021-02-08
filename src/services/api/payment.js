const { post } = require("./axiosClient");
export const createPaymentIntent = (token, data) => {
  return post(`/payment/create-payment-intent`, token, data);
};
