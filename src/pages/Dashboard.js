import React, { useState } from "react";
import History from "./user/History";
import Password from "./user/Password";
import Wishlist from "./user/Wishlist";
import UserNav from "../components/nav/UserNav";
const Dashboard = ({ keyDefault }) => {
  const [keyNav, setKeyNav] = useState(keyDefault);
  const handleChangeKeyNav = (e) => {
    setKeyNav(e.key);
  };
  return (
    <div className="row">
      <div className="col-md-2">
        <UserNav handleClick={handleChangeKeyNav} keyNav={keyNav}></UserNav>
      </div>
      <div className="col-md-10">
        {keyNav === "1" && <History></History>}
        {keyNav === "2" && <Password></Password>}
        {keyNav === "3" && <Wishlist></Wishlist>}
      </div>
    </div>
  );
};
export default Dashboard;
