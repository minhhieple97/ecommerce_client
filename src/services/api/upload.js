const { post, remove } = require("./axiosClient");

export const uploadImage = async (data, token) => {
  return await post("/upload/image", token, { ...data });
};

export const deleteImage = async (token, imageId) => {
  return await remove(`/upload/image/${imageId}`, token);
};
