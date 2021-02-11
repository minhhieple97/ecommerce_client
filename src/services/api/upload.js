const { post, remove } = require("./axiosClient");

export const uploadImage = (data) => {
  return post("/upload/image", { ...data });
};

export const deleteImage = (imageId) => {
  return remove(`/upload/image/${imageId}`);
};
