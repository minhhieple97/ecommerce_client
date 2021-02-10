import { emptyUserCart } from "../../services/api/cart";
import {
  ADD_TO_CART,
  EMPTY_CART,
  INIT_CART,
  REMOVE_TO_CART,
  UPDATE_TO_CART,
  START_CART,
  FINISH_CART,
  APPLY_COUPON,
  COD_CHECKOUT,
} from "./actionType";
export const initCart = () => {
  return {
    type: INIT_CART,
  };
};
export const startCart = () => {
  return {
    type: START_CART,
  };
};
export const finishCart = () => {
  return {
    type: FINISH_CART,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const applyCoupon = (flag) => {
  return {
    type: APPLY_COUPON,
    payload: flag,
  };
};

export const updateToCart = (data) => {
  return {
    type: UPDATE_TO_CART,
    payload: data,
  };
};
export const removeToCart = (productId) => {
  return {
    type: REMOVE_TO_CART,
    payload: productId,
  };
};
export const codCheckout = () => {
  return {
    type: COD_CHECKOUT,
  };
};
export const emptyCart = () => async (dispatch) => {
  dispatch(startCart());
  await emptyUserCart();
  localStorage.removeItem("cart");
  dispatch({ type: EMPTY_CART });
  dispatch(finishCart());
};
