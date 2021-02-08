const { get, post, remove, update } = require("./axiosClient");

export const getSubs = (token) => {
    return get("/sub/list", token);
};

export const getSub = (slug) => {
    return get(`/sub/${slug}`, null);
};

export const postSub = (token, data) => {
    return post("/sub", token, data);
};

export const deleteSub = (token, slug) => {
    return remove(`/sub/${slug}`, token);
};

export const updateSub = (token, slug, data) => {
    return update(`/sub/${slug}`, token, data);
};
