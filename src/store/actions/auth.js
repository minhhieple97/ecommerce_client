import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_SUCCESS,
  SET_AUTH_REDIRECT_PATH,
} from "./actionType";
import { auth as authFirebase, googleAuthProvider } from "../../firebase";
import {
  createOrUpdateUser,
  sessionLogin,
  sessionLogout,
} from "../../services/api/auth";

export const authStart = (isGoogleLogin) => {
  return {
    type: AUTH_START,
    payload: isGoogleLogin,
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    payload: path,
  };
};
export const authSuccess = (data) => {
  return {
    type: AUTH_SUCCESS,
    payload: { ...data },
  };
};
export const authFail = (data) => {
  return {
    type: AUTH_FAIL,
    payload: data,
  };
};
export const logout = () => {
  localStorage.removeItem("_id");
  localStorage.removeItem("email");
  localStorage.removeItem("name");
  localStorage.removeItem("role");
  localStorage.removeItem("expiresIn");
  // sessionLogout();
  return {
    type: AUTH_LOGOUT,
    payload: null,
  };
};
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
export const auth = (email, password, isSignup, isGoogleLogin, url) => {
  return async (dispatch) => {
    try {
      let result;
      let data;
      const expiresIn = Date.now() + 60 * 60 * 24 * 5 * 1000;
      if (isSignup) {
        dispatch(authStart(false));
        result = await authFirebase.signInWithEmailLink(email, url);
        if (result.user.emailVerified) {
          window.localStorage.removeItem("emailForRegistration");
          const user = authFirebase.currentUser;
          await user.updatePassword(password);
          const idToken = await user.getIdToken();
          await sessionLogin({ idToken });
          data = await createOrUpdateUser();
        }
      } else {
        if (isGoogleLogin) {
          dispatch(authStart(true));
          result = await authFirebase.signInWithPopup(googleAuthProvider);
          const { user } = result;
          const idToken = await user.getIdToken();
          await sessionLogin({ idToken });
          data = await createOrUpdateUser();
        } else {
          dispatch(authStart(false));
          result = await authFirebase.signInWithEmailAndPassword(
            email,
            password
          );
          const { user } = result;
          const idToken = await user.getIdToken();
          await sessionLogin({ idToken });
          data = await createOrUpdateUser();
        }
      }
      localStorage.setItem("_id", data._id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("expiresIn", expiresIn);
      dispatch(
        authSuccess({
          email: data.email,
          role: data.role,
          name: data.name,
          _id: data._id,
          error: null,
          loading: false,
          loadingGoogle: false,
        })
      );
    } catch (error) {
      let message;
      switch (error.code) {
        case "auth/invalid-email":
          message = "Your email address is not valid, please try again.";
          break;
        case "auth/too-many-requests":
          message =
            "You have failed login too many times, please try again in a few minutes.";
          break;
        case "auth/user-not-found":
          message =
            "This email has not been registered for an account, please register for an account and try again.";
          break;
        case "auth/wrong-password":
          message = "Password or email is incorrect, please try again.";
          break;
        case "auth/argument-error":
        case "auth/invalid-action-code":
          message =
            "The link has expired or you have registered with this email, please try again.";
          break;
        default:
          message = error.message;
          break;
      }
      dispatch(authFail({ error: message }));
    }
  };
};

export const authCheckLogin = () => {
  return (dispatch) => {
    const _id = localStorage.getItem("_id");
    if (!_id) dispatch(logout());
    else {
      const expirationTime = localStorage.getItem("expiresIn");
      if (expirationTime - Date.now() < 0) dispatch(logout());
      else {
        const _id = localStorage.getItem("_id");
        const email = localStorage.getItem("email");
        const name = localStorage.getItem("name");
        const role = localStorage.getItem("role");
        dispatch(
          authSuccess({
            email,
            role,
            name,
            _id,
            loading: false,
            loadingGoogle: false,
            error: null,
          })
        );
        dispatch(checkAuthTimeout(expirationTime - Date.now()));
      }
    }
  };
};
