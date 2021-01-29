import { INITIAL_STATE_SHOW_SIDE_DRAW } from "../../ultil/constants";
import { TOGGLE_SIDE_DRAW } from "../actions/actionType";
const toggleSideDraw = ({ payload }) => {
    return payload
};
const reducer = (state = INITIAL_STATE_SHOW_SIDE_DRAW, action) => {
    switch (action.type) {
        case TOGGLE_SIDE_DRAW:
            return toggleSideDraw(action);
        default:
            return state;
    }
};
export default reducer;
