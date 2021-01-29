import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { Button } from "antd";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      if (!password || password.length < 6) {
        throw new Error("Password must be 6 characters or more.");
      }
      setLoading(true);
      await auth.currentUser.updatePassword(password);
      setLoading(false);
      toast.success("Password successfully updated.");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const passwordUpdateForm = () => {
    return (
      <form>
        <div className="form-group">
          <label>Your Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter new password"
            disabled={loading}
            value={password}
          ></input>
          <br></br>
          <Button
            type="primary"
            disabled={loading || !password || password.length < 6}
            loading={loading}
            onClick={handleSubmit}
          >
            Update
          </Button>
        </div>
      </form>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav></UserNav>
        </div>
        <div className="col">
          <h3>Password Update</h3>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};
export default Password;
