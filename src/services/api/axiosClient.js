import axios from "axios";
import queryString from "query-string";
const API_URL = process.env.REACT_APP_API;
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_URL,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosInstance.interceptors.request.use(async (config) => {
  return config;
});
axiosInstance.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const message =
      error.response && error.response.data
        ? error.response.data.message
        : "Something went wrong, please try again.";
    throw new Error(message);
  }
);
const post = (url, data) => {
  return axiosInstance({
    method: "POST",
    url,
    data,
  });
};
const get = (url, params) => {
  return axiosInstance({
    method: "GET",
    url,
    params,
  });
};
const remove = (url, params) => {
  return axiosInstance({
    method: "DELETE",
    url,
    params,
  });
};
const update = (url, data) => {
  return axiosInstance({
    method: "PATCH",
    url,
    data,
  });
};

export { get, post, remove, update };
