const { post, remove } = require("./axiosClient");

export const uploadImage = async (data) => {
  return await post("/upload/image", { ...data });
};

export const deleteImage = async (imageId) => {
  return await remove(`/upload/image/${imageId}`);
};
