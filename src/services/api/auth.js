import { post } from "./axiosClient";

export const createOrUpdateUser = async () => {
  return await post("/auth/create-or-update-user");
};

export const sessionLogin = async (data) => {
  return await post("/auth/session-login", data);
};

export const sessionLogout = async () => {
  return await post("/auth/session-logout");
};
