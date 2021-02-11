import { post } from "./axiosClient";

export const createOrUpdateUser = () => {
  return post("/auth/create-or-update-user");
};

export const sessionLogin = (data) => {
  return post("/auth/session-login", data);
};

export const sessionLogout = () => {
  return post("/auth/session-logout");
};
