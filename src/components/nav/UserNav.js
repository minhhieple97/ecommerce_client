import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  HistoryOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const UserNav = ({ keyNav, handleClick }) => {
  return (
    <Menu onClick={handleClick} selectedKeys={[keyNav]} mode="inline">
      <Menu.Item key="1" icon={<HistoryOutlined />}>
        <Link to="/user/history">Order history</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        <Link to="/user/user-info">Personal information</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<HeartOutlined />}>
        <Link to="/user/wishlist">Wishlist</Link>
      </Menu.Item>
    </Menu>
  );
};

export default UserNav;
