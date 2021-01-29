import { SEARCH_QUERY } from "./actionType";

export const searchQuery = (text) => {
    return {
        type: SEARCH_QUERY,
        payload: { text },
    };
};