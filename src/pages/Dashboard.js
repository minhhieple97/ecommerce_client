import { DeleteOutlined } from "@ant-design/icons";
import { Card, Spin } from "antd";
import { Table, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import Spinner from "../../components/Spinner";
import { getWishlist, removeWishlist } from "../../services/api/user";
import { List, Avatar, Space } from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from "@ant-design/icons";
const Dashboard = () => {
  const [keyNav, setKeyNav] = useState("1");
  return (
    <div className="row">
      <div className="col-md-2">
        <UserNav keyNav="3"></UserNav>
      </div>
      <div className="col-md-10"></div>
    </div>
  );
};
export default Dashboard;
