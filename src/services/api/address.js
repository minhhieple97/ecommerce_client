const { get } = require("./axiosClient");
export const getCities = (query) => {
    return get(`/administrative/cities`, null, { ...query });
};
export const getDistricts = (query) => {
    return get(`/administrative/districts`, null, { ...query });
};
export const getWards = (query) => {
    return get(`/administrative/wards`, null, { ...query });
};




