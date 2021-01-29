import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../ultil/validation";
import { auth } from "../../store/actions";
const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const { loading, _id } = useSelector(state => state.user)
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  if (_id) {
    // switch (role) {
    //   case 'admin':
    //     return <Redirect to="/admin/dashboard"></Redirect>
    //   case 'subscriber':
    //     return <Redirect to="/user/history"></Redirect>
    //   default:
    //     return <Redirect to="/"></Redirect>
    // }
    return <Redirect to="/"></Redirect>
  }
  const handleSubmit = async () => {
    const flagEmail = validateEmail(email);
    if (!flagEmail) {
      toast.error("Your email address is not valid, please try again.")
      return
    }
    if (!email || !password) {
      toast.error("Email and password is required.");
      return
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return
    }
    window.localStorage.removeItem("emailForRegistration")
    dispatch(auth(email, password, false, false, window.location.href))
  };
  const registerCompleteForm = () => (
    <form>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        required
      />
      <br />
      <Button loading={loading} type="primary" onClick={handleSubmit} className="mb-3" block shape="round" size="large" disabled={!password || loading}  >
        Register complete
            </Button>
    </form>
  );
  if (_id) {
    return <Redirect to="/" ></Redirect>
  }
  return (
    <div className="container p-5">
      <div className="col-md-6 offset-md-3">
        <h4>Register complete</h4>
        {registerCompleteForm()}
      </div>
    </div>
  );
};

export default RegisterComplete;
