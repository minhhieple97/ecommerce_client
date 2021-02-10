import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authCheckLogin } from "./store/actions";
import NotFoundPage from "./components/NotFoundPage";
import { LoadingOutlined } from "@ant-design/icons";
// use lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const Draw = lazy(() => import("./components/sideDraw/Draw"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const History = lazy(() => import("./pages/user/History"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const Password = lazy(() => import("./pages/user/Password"));
const Wishlist = lazy(() => import("./pages/user/Wishlist"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(() =>
  import("./pages/admin/category/CategoryCreate")
);
const CategoryUpdate = lazy(() =>
  import("./pages/admin/category/CategoryUpdate")
);
const SubCreate = lazy(() => import("./pages/admin/sub/SubCreate"));
const SubUpdate = lazy(() => import("./pages/admin/sub/SubUpdate"));
const ProductCreate = lazy(() => import("./pages/admin/product/ProductCreate"));
const ProductsAdmin = lazy(() => import("./pages/admin/product/ProductList"));
const ProductUpdate = lazy(() => import("./pages/admin/product/ProductUpdate"));
const Product = lazy(() => import("./pages/product/Product"));
const CategoryHome = lazy(() => import("./pages/category/CategoryHome"));
const SubHome = lazy(() => import("./pages/sub/SubHome"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CreateCoupon = lazy(() => import("./pages/admin/coupon/CreateCoupon"));
const Payment = lazy(() => import("./pages/Payment"));
const App = () => {
  console.log(process.env);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckLogin());
  }, [dispatch]);
  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          __ React Redux <LoadingOutlined></LoadingOutlined> E-commerce __
        </div>
      }
    >
      <Header></Header>
      <Draw></Draw>
      <ToastContainer></ToastContainer>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/register" component={Register}></Route>
        <Route
          exact
          path="/register/complete"
          component={RegisterComplete}
        ></Route>
        <Route exact path="/forgot/password" component={ForgotPassword}></Route>
        <Route path="/product/:slug" exact component={Product}></Route>
        <UserRoute exact path="/user/history" component={History} />
        <UserRoute exact path="/user/password" component={Password} />
        <UserRoute exact path="/user/wishlist" component={Wishlist} />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={AdminDashboard}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin/category"
          component={CategoryCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={CategoryUpdate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/sub-category"
          component={SubCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/sub-category/:slug"
          component={SubUpdate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/product"
          component={ProductCreate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/product/list"
          component={ProductsAdmin}
        ></AdminRoute>

        <Route path="/category/:slug" exact component={CategoryHome}></Route>

        <Route path="/sub-category/:slug" exact component={SubHome}></Route>

        <Route path="/shop" exact component={Shop}></Route>

        <UserRoute exact path="/checkout" component={Checkout} />

        <UserRoute exact path="/payment" component={Payment} />

        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={ProductUpdate}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/coupon"
          component={CreateCoupon}
        ></AdminRoute>
        <Route path="/cart" exact component={Cart}></Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
export default App;
