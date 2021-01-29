export const INITIAL_STATE_USER = {
  token: null,
  _id: null,
  error: null,
  loading: false,
  loadingGoogle: false,
  role: null,
  email: null,
  name: null,
  authRedirect: null,
};
export const INITIAL_STATE_CART = {
  products: [],
  loading: false,
  couponApply: false,
  cod: false,
};
export const INITIAL_STATE_TEXT = {
  text: "",
};
export const ADMIN_ROLE = "admin";
export const USER_ROLE = "subscriber";
export const ENUM_COLORS = ["Black", "Brown", "Silver", "White", "Blue"];
export const ENUM_BRANDS = ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"];
export const INITIAL_STATE_SHOW_SIDE_DRAW = false;
export const INITIAL_STATE_PRODUCT = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  color: "",
  brand: "",
  colors: ENUM_COLORS,
  brands: ENUM_BRANDS,
};
