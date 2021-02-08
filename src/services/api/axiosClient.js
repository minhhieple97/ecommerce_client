import axios from "axios";
import queryString from "query-string";
const API_URL = process.env.REACT_APP_API;
const axiosInstance = axios.create({
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
    const message = (error.response && error.response.data) ? error.response.data.message : "Something went wrong, please try again."
    throw new Error(message);
  }
);
const post = (url, token, data) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axiosInstance({
    method: "POST",
    url,
    data,
    headers,
  });
};

const get = (url, token, params) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return axiosInstance({
    method: "GET",
    url,
    headers,
    params,
  });
};
const remove = (url, token, params) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axiosInstance({
    method: "DELETE",
    url,
    headers,
    params,
  });
};

const update = (url, token, data) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axiosInstance({
    method: "PATCH",
    url,
    headers,
    data,
  });
};

export { get, post, remove, update };
