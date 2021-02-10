import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartTable from "../components/table/CartTable";
import { toast } from "react-toastify";
import {
  codCheckout,
  removeToCart,
  setAuthRedirectPath,
  updateToCart,
} from "../store/actions";
import { postCart } from "../services/api/cart";
import { Spin } from "antd";
const Cart = ({ history, match }) => {
  const [loading, setLoading] = useState(false);
  const { cart, user } = useSelector((state) => ({ ...state }));
  const { products } = cart;
  const dispatch = useDispatch();
  const handleRedirect = () => {
    dispatch(setAuthRedirectPath(match.url));
    history.push("/login");
  };
  const getTotal = () =>
    products.reduce((res, el) => {
      return (res += el.count * el.price);
    }, 0);
  const handleCart = async () => {
    try {
      setLoading(true);
      await postCart({ cart: cart.products });
      setLoading(false);
      history.push("/checkout");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response ? error.response.data : error.message);
    }
  };
  const handleCash = async () => {
    try {
      setLoading(true);
      dispatch(codCheckout());
      await postCart({ cart: cart.products });
      setLoading(false);
      history.push("/checkout");
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.response ? error.response.data : error.message);
    }
  };
  const handleOnChangeColor = (e, _id) => {
    dispatch(updateToCart({ color: e.target.value, _id }));
  };
  const handleCountProduct = (value, _id, quantity) => {
    if (value > quantity) {
      return toast.error(`Max available quantity: ${quantity}`);
    }
    dispatch(updateToCart({ count: value, _id }));
  };
  const handleRemoveCart = (_id) => {
    dispatch(removeToCart(_id));
  };
  return (
    <Spin spinning={loading}>
      <div className="container-fluid">
        <div className="row pt-4 pr-4 pl-4 pb-2">
          <h4>Cart / {products.length} Product </h4>
        </div>
        <div className="row">
          <div className="col-md-8">
            {!products.length ? (
              <p>
                No products in cart. <Link to="/shop">Continue Shopping.</Link>
              </p>
            ) : (
              <CartTable
                handleRemoveCart={handleRemoveCart}
                handleCountProduct={handleCountProduct}
                products={products}
                handleOnChangeColor={handleOnChangeColor}
              ></CartTable>
            )}
          </div>
          <div className="col-md-4">
            <h4>Order Summary</h4>
            <hr />
            <p>Products</p>
            {products.map((c, i) => {
              return (
                <div key={c._id}>
                  <p>
                    {c.title} x {c.count} = ${c.price * c.count}
                  </p>
                </div>
              );
            })}
            <hr />
            Total: <b>${getTotal()}</b>
            <hr />
            {user._id ? (
              <>
                <button
                  disabled={!products.length}
                  onClick={handleCart}
                  className="btn btn-sm btn-primary mt-2"
                >
                  Proceed to Checkout
                </button>
                <br />
                <button
                  disabled={!products.length}
                  onClick={handleCash}
                  className="btn btn-sm btn-warning mt-2"
                >
                  Pay Cash on Delivery
                </button>
              </>
            ) : (
              <button
                onClick={handleRedirect}
                className="btn btn-sm btn-primary mt-2"
              >
                Login to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Cart;
