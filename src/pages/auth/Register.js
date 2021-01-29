import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button } from "antd";
import { validateEmail } from "../../ultil/validation";
const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user)
  if (user._id) {
    return <Redirect to="/" ></Redirect>
  }
  const handleSubmit = async () => {
    try {
      setLoading(true)
      const flagEmail = validateEmail(email);
      if (!flagEmail) {
        throw new Error('Your email address is not valid, please try again.');
      }
      const config = {
        url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp: true,
      };
      await auth.sendSignInLinkToEmail(email, config);
      setLoading(false)
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );
      window.localStorage.setItem("emailForRegistration", email);
      setEmail("");
    } catch (error) {
      setLoading(false)
      let message = '';
      switch (error.code) {
        case "auth/invalid-email":
          message = 'Your email address is not valid, please try again.'
          break;
        default:
          message = error.message;
      }
      toast.error(message)
    }
  };
  const registerForm = () => (
    <form  >
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        disabled={loading}
        autoFocus
      />
      <br />
      <Button loading={loading} type="primary" onClick={handleSubmit} className="mb-3" block shape="round" size="large" disabled={!email || loading}  >
        Register
            </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="col-md-6 offset-md-3">
        <h4>Register</h4>
        {registerForm()}
      </div>
    </div>
  );
};

export default Register;
