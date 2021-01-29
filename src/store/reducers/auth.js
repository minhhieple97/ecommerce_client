import { INITIAL_STATE_USER } from "../../ultil/constants";
import { updateObject } from "../../ultil/helper";
import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  SET_AUTH_REDIRECT_PATH,
} from "../actions/actionType";
const authStart = (state, { payload }) => {
  const loadingGoogle = payload;
  return updateObject(state, {
    loading: !loadingGoogle,
    loadingGoogle,
    error: null,
  });
};
const authSuccess = (state, { payload }) => {
  const {
    email,
    token,
    role,
    name,
    _id,
    loading,
    loadingGoogle,
    error,
  } = payload;
  return updateObject(state, {
    email,
    token,
    role,
    name,
    _id,
    loading,
    loadingGoogle,
    error,
  });
};
const authLogout = (state) => {
  return updateObject(state, {
    token: null,
    email: null,
    _id: null,
    role: null,
    name: null,
    loading: false,
    loadingGoogle: false,
    error: null,
    authRedirect: null
  });
};
const authFail = (state, { payload }) => {
  return updateObject(state, {
    loading: false,
    loadingGoogle: false,
    error: payload.error,
  });
};
const setAuthRedirectPath = (state, { payload }) => {
  return updateObject(state, {
    authRedirect: payload
  });
};
const reducer = (state = INITIAL_STATE_USER, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_LOGOUT:
      return authLogout(state);
    case AUTH_FAIL:
      return authFail(state, action);
    case SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return { ...state };
  }
};
export default reducer;
