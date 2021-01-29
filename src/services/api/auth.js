import { post } from "./axiosClient";

export const createOrUpdateUser = async (token) => {
  return await post("auth/create-or-update-user", token);
};
