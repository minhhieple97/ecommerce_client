import { REQUEST_FAILED, REQUEST_STARTED, REQUEST_SUCCESSFUL } from "../../store/actions/actionType";
export const requestSuccessful = ({ data }) => ({
    type: REQUEST_SUCCESSFUL,
    data,
});
export const requestStarted = () => ({
    type: REQUEST_STARTED,
});
export const requestFailed = ({ error }) => ({
    type: REQUEST_FAILED,
    error,
});