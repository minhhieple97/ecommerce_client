import { REQUEST_FAILED, REQUEST_STARTED, REQUEST_SUCCESSFUL } from "../../store/actions/actionType";
export const reducerGet = (state, action) => {
    switch (action.type) {
        case REQUEST_STARTED:
            return {
                ...state,
                loading: true,
            };
        case REQUEST_SUCCESSFUL:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.data,
            };
        case REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};