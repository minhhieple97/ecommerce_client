import React, { useState } from "react";
import {
  AppstoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions";
import { USER_ROLE } from '../../ultil/constants';
import Search from "../forms/Search";
const { SubMenu, Item } = Menu;
const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user, cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClick = (e) => {

    setCurrent(e.key);
  };
  const handleLogout = () => {
    dispatch(logout());
    history.push("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShopOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined />}>
        <Link to="/cart">
          <Badge count={cart.products.length} offset={[9, 0]}>
            Cart
          </Badge>
        </Link>
      </Item>
      {!user._id && (
        <React.Fragment>
          <Item key="register" icon={<UserAddOutlined />}>
            <Link to="/register">Register</Link>
          </Item>
          <Item key="login" icon={<UserOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        </React.Fragment>
      )}
      {user._id && (
        <SubMenu
          className="float-right"
          icon={<SettingOutlined />}
          title={user.name || user.email.split("@")[0]}
        >
          {user.role === USER_ROLE ? (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          ) : (
              <Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Item>
            )}
          <Item icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className="float-right p-1">
        <Search></Search>
      </span>
    </Menu>
  );
};

export default Header;
