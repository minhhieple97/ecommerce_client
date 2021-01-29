import { INITIAL_STATE_CART } from "../../ultil/constants";
import { updateObject } from "../../ultil/helper";
import _ from "lodash";
import {
  ADD_TO_CART,
  APPLY_COUPON,
  COD_CHECKOUT,
  EMPTY_CART,
  FINISH_CART,
  INIT_CART,
  REMOVE_TO_CART,
  START_CART,
  UPDATE_TO_CART,
} from "../actions/actionType";
const addToCart = (state, { payload }) => {
  const newCart = [...state.products];
  newCart.push({
    ...payload,
    count: 1,
  });
  const uniqueCart = _.uniqWith(newCart, _.isEqual);
  localStorage.setItem("cart", JSON.stringify(uniqueCart));
  return updateObject(state, { products: uniqueCart });
};
const updateToCart = (state, { payload }) => {
  const { count, color, _id } = payload;
  const newObj = {};
  if (count) newObj.count = count;
  if (color) newObj.color = color;
  const newProducts = [...state.products];
  const productIndex = newProducts.findIndex((el) => el._id === _id);

  newProducts[productIndex] = updateObject(newProducts[productIndex], newObj);
  localStorage.setItem("cart", JSON.stringify(newProducts));
  return updateObject(state, { products: newProducts });
};
const removeToCart = (state, { payload }) => {
  const _id = payload;
  const newProducts = [...state.products].filter((el) => el._id !== _id);
  localStorage.setItem("cart", JSON.stringify(newProducts));
  return updateObject(state, { products: newProducts });
};
const initCart = (state) => {
  let newProducts = [...state.products];
  const checkCartExist = localStorage.getItem("cart");
  if (checkCartExist) {
    newProducts = JSON.parse(checkCartExist);
  }
  return updateObject(state, { products: newProducts });
};
const emptyCart = () => {
  return { ...INITIAL_STATE_CART };
};
const startCart = (state) => {
  return updateObject(state, { loading: true });
};
const finishCart = (state) => {
  return updateObject(state, { loading: false });
};
const applyCoupon = (state, { payload }) => {
  return updateObject(state, { couponApply: payload });
};
const codCheckout = (state) => {
  return updateObject(state, { cod: true });
};
const reducer = (state = INITIAL_STATE_CART, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return addToCart(state, action);
    case REMOVE_TO_CART:
      return removeToCart(state, action);
    case UPDATE_TO_CART:
      return updateToCart(state, action);
    case EMPTY_CART:
      return emptyCart();
    case START_CART:
      return startCart(state);
    case FINISH_CART:
      return finishCart(state);
    case APPLY_COUPON:
      return applyCoupon(state, action);
    case INIT_CART:
      return initCart(state);
    case COD_CHECKOUT:
      return codCheckout(state);
    default:
      return initCart(state);
  }
};
export default reducer;
