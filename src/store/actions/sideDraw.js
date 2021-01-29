import { TOGGLE_SIDE_DRAW } from "./actionType";
export const toggleSideDraw = (toggle) => {
    return {
        type: TOGGLE_SIDE_DRAW,
        payload: toggle,
    };
};