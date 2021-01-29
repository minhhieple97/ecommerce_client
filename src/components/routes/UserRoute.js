import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ ...rest }) => {
  const user = useSelector((state) => state.user);
  return user._id ? (
    <Route {...rest}></Route>
  ) : (
      <LoadingToRedirect></LoadingToRedirect>
    );
};

export default UserRoute;
