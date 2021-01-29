const { get, post, remove, update } = require("./axiosClient");

export const getSubs = async (token) => {
    return await get("/sub/list", token);
};

export const getSub = async (slug) => {
    return await get(`/sub/${slug}`, null);
};

export const postSub = async (token, data) => {
    return await post("/sub", token, data);
};

export const deleteSub = async (token, slug) => {
    return await remove(`/sub/${slug}`, token);
};

export const updateSub = async (token, slug, data) => {
    return await update(`/sub/${slug}`, token, data);
};
