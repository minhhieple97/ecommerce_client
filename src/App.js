import "./App.css";
import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authCheckLogin } from "./store/actions";
import NotFoundPage from "./components/NotFoundPage";
import ErrorBoundary from "./components/error-handing/ErrorBoundary";
import { LoadingOutlined } from "@ant-design/icons";
// use lazy
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/nav/Header"));
const Draw = lazy(() => import("./components/sideDraw/Draw"));
const RegisterComplete = lazy(() => import("./pages/auth/RegisterComplete"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const UserRoute = lazy(() => import("./components/routes/UserRoute"));
const AdminRoute = lazy(() => import("./components/routes/AdminRoute"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
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
        <Route
          path="/"
          exact
          component={(props) => (
            <ErrorBoundary>
              <Home {...props}></Home>
            </ErrorBoundary>
          )}
        ></Route>
        <Route
          exact
          path="/login"
          component={(props) => (
            <ErrorBoundary>
              <Login {...props}></Login>
            </ErrorBoundary>
          )}
        ></Route>
        <Route
          exact
          path="/register"
          component={(props) => (
            <ErrorBoundary>
              <Register {...props}></Register>
            </ErrorBoundary>
          )}
        ></Route>
        <Route
          exact
          path="/register/complete"
          component={(props) => (
            <ErrorBoundary>
              <RegisterComplete {...props}></RegisterComplete>
            </ErrorBoundary>
          )}
        ></Route>
        <Route
          exact
          path="/forgot/password"
          component={(props) => (
            <ErrorBoundary>
              <ForgotPassword {...props}></ForgotPassword>
            </ErrorBoundary>
          )}
        ></Route>
        <Route
          path="/product/:slug"
          exact
          component={(props) => (
            <ErrorBoundary>
              <Product {...props}></Product>
            </ErrorBoundary>
          )}
        ></Route>
        <UserRoute
          exact
          path="/user/history"
          component={(props) => (
            <ErrorBoundary {...props}>
              <Dashboard keyDefault="1"></Dashboard>
            </ErrorBoundary>
          )}
        />
        <UserRoute
          exact
          path="/user/user-info"
          component={(props) => (
            <ErrorBoundary>
              <Dashboard {...props} keyDefault="2"></Dashboard>
            </ErrorBoundary>
          )}
        />
        <UserRoute
          exact
          path="/user/wishlist"
          component={(props) => (
            <ErrorBoundary>
              <Dashboard {...props} keyDefault="3"></Dashboard>
            </ErrorBoundary>
          )}
        />
        <AdminRoute
          exact
          path="/admin/dashboard"
          component={(props) => (
            <ErrorBoundary>
              <AdminDashboard {...props}></AdminDashboard>
            </ErrorBoundary>
          )}
        ></AdminRoute>

        <AdminRoute
          exact
          path="/admin/category"
          component={(props) => (
            <ErrorBoundary>
              <CategoryCreate {...props}></CategoryCreate>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/category/:slug"
          component={(props) => (
            <ErrorBoundary>
              <CategoryUpdate {...props}></CategoryUpdate>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/sub-category"
          component={(props) => (
            <ErrorBoundary>
              <SubCreate {...props}></SubCreate>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/sub-category/:slug"
          component={(props) => (
            <ErrorBoundary>
              <SubUpdate {...props}></SubUpdate>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/product"
          component={(props) => (
            <ErrorBoundary>
              <ProductCreate {...props}></ProductCreate>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/product/list"
          component={(props) => (
            <ErrorBoundary>
              <ProductsAdmin {...props}></ProductsAdmin>
            </ErrorBoundary>
          )}
        ></AdminRoute>

        <Route
          path="/category/:slug"
          exact
          component={(props) => (
            <ErrorBoundary>
              <CategoryHome {...props}></CategoryHome>
            </ErrorBoundary>
          )}
        ></Route>

        <Route
          path="/sub-category/:slug"
          exact
          component={(props) => (
            <ErrorBoundary>
              <SubHome {...props}></SubHome>
            </ErrorBoundary>
          )}
        ></Route>

        <Route
          path="/shop"
          exact
          component={(props) => (
            <ErrorBoundary>
              <Shop {...props}></Shop>
            </ErrorBoundary>
          )}
        ></Route>

        <UserRoute
          exact
          path="/checkout"
          component={(props) => (
            <ErrorBoundary>
              <Checkout {...props}></Checkout>
            </ErrorBoundary>
          )}
        />

        <UserRoute
          exact
          path="/payment"
          component={(props) => (
            <ErrorBoundary>
              <Payment {...props}></Payment>
            </ErrorBoundary>
          )}
        />

        <AdminRoute
          exact
          path="/admin/product/:slug"
          component={(props) => (
            <ErrorBoundary>
              <ProductUpdate {...props}></ProductUpdate>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <AdminRoute
          exact
          path="/admin/coupon"
          component={(props) => (
            <ErrorBoundary>
              <CreateCoupon {...props}></CreateCoupon>
            </ErrorBoundary>
          )}
        ></AdminRoute>
        <Route
          path="/cart"
          exact
          component={(props) => (
            <ErrorBoundary>
              <Cart {...props}></Cart>
            </ErrorBoundary>
          )}
        ></Route>
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};
export default App;
