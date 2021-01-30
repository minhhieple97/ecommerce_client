import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { validateEmail } from "../../ultil/validation";
import { auth } from "../../store/actions";
import MyLink from "../../components/link/MyLink";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {
    loading,
    _id,
    error: message,
    role,
    loadingGoogle,
    authRedirect,
  } = useSelector((state) => state.user);
  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);
  if (_id) {
    switch (role) {
      case "admin":
        return (
          <Redirect
            to={authRedirect ? authRedirect : "/admin/dashboard"}
          ></Redirect>
        );
      default:
        return <Redirect to="/"></Redirect>;
    }
  }
  const handleSubmit = async () => {
    const flagEmail = validateEmail(email);
    if (!flagEmail) {
      toast.error("Your email address is not valid, please try again.");
      return;
    }
    dispatch(auth(email, password, false, false, null));
  };
  const handleGoogleLogin = async () => {
    dispatch(auth(null, null, false, true, null));
  };

  const loginForm = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
        />
      </div>

      <Button
        loading={loading}
        onClick={handleSubmit}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || !password || loading || loadingGoogle}
      >
        Login with Email/Password
      </Button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="col-md-6 offset-md-3">
        <h4>Login</h4>
        {loginForm()}
        <Button
          onClick={handleGoogleLogin}
          type="danger"
          loading={loadingGoogle}
          disabled={loadingGoogle || loading}
          className="mb-3"
          block
          shape="round"
          icon={<GoogleOutlined />}
          size="large"
        >
          Login with Goolgle
        </Button>
        <MyLink
          loading={loading || loadingGoogle}
          to="/forgot/password"
          className="float-right text-danger"
          text="Forgot Password"
        ></MyLink>
      </div>
    </div>
  );
};

export default Login;
