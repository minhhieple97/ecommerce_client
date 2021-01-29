import userReducer from "./auth";
import searchReducer from "./search";
import cartReducer from "./cart";
import sideDrawReducer from './sideDraw'
import { combineReducers } from "redux";
export default combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  toggle: sideDrawReducer
});
