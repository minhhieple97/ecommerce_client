const { post, remove } = require("./axiosClient");

export const uploadImage = async (data, token) => {
  return post("/upload/image", token, { ...data });
};

export const deleteImage = async (token, imageId) => {
  return remove(`/upload/image/${imageId}`, token);
};
