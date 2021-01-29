import { INITIAL_STATE_TEXT } from "../../ultil/constants";
import { SEARCH_QUERY } from "../actions/actionType";

const reducer = (state = INITIAL_STATE_TEXT, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return { ...state, ...action.payload };
        default:
            return { ...state };
    }
};
export default reducer;
