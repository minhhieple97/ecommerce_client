import { post } from "./axiosClient";

export const createOrUpdateUser = (token) => {
  return post("auth/create-or-update-user", token);
};
