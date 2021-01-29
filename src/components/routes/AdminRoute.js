import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";
import { ADMIN_ROLE } from "../../ultil/constants";
const AdminRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.user);
  return user.role === ADMIN_ROLE ? (
    <Route {...rest}></Route>
  ) : (
    <LoadingToRedirect></LoadingToRedirect>
  );
};

export default AdminRoute;
