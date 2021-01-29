import { DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import Spinner from "../../components/Spinner";
import { getWishlist, removeWishlist } from "../../services/api/user";
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const _getWishlist = useCallback(async () => {
    try {
      const { userWishlist } = await getWishlist(user.token);
      setWishlist(userWishlist.wishlist);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [user.token]);
  useEffect(() => {
    _getWishlist();
  }, [_getWishlist]);
  const handleRemoveFromWishlist = async (id) => {
    try {
      setLoadingSubmit(true);
      await removeWishlist(user.token, id);
      const newWishlist = wishlist.filter((el) => el._id !== id);
      setWishlist(newWishlist);
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
    }
  };
  const showWishlist = () => {
    return <>
      <h4>Wishlist</h4>
      {wishlist.map((p) => (
        <div key={p._id} className="alert alert-secondary">
          <Link to={`/product/${p.slug}`}>{p.title}</Link>
          <span
            onClick={() => handleRemoveFromWishlist(p._id)}
            className="btn btn-sm float-right"
          >
            <DeleteOutlined className="text-danger" />
          </span>
        </div>
      ))}
    </>
  }
  return (
    <div className="container-fluid">
      {loading ? (
        <Spinner></Spinner>
      ) : (
          <Spin spinning={loadingSubmit}>
            <div className="row">
              <div className="col-md-2">
                <UserNav></UserNav>
              </div>
              <div className="col-md-10">
                {wishlist.length > 0 ? showWishlist() : <h4 style={{ marginTop: "10px" }} className="text-center" >No wish list found</h4>}
              </div>
            </div>
          </Spin>
        )}
    </div>
  );
};
export default Wishlist;
