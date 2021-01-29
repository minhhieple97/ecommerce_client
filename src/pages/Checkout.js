import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { getCart } from "../services/api/cart";
import { emptyCart } from "../store/actions";
import {
  addAddress,
  applyCoupon as applyCouponApi,
  createCashOrder,
} from "../services/api/user";
import { toast } from "react-toastify";
import AddAddress from "../components/checkout/AddAddress";
import ProductSummary from "../components/checkout/ProductSummary";
import ApplyCoupon from "../components/checkout/ApplyCoupon";
import { finishCart, startCart, applyCoupon, initCart } from "../store/actions/cart";
const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => state);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState("");
  const [hasAddress, setHasAddress] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const _getCart = useCallback(async () => {
    try {
      const data = await getCart(user.token);
      if (data.products && data.cartTotal) {
        const { products, cartTotal } = data;
        setProducts([...products]);
        setTotal(cartTotal);
      }
      setLoadingData(false);
    } catch (error) {
      console.log(error.message);
      setLoadingData(false);
    }
  }, [user.token]);
  useEffect(() => {
    _getCart();
  }, [_getCart]);
  const handleAddress = async () => {
    try {
      dispatch(startCart());
      await addAddress(user.token, { address });
      toast.success("Save address success.");
      dispatch(finishCart());
      setHasAddress(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEmptyCart = () => {
    dispatch(emptyCart(user.token));
    setProducts([]);
    setTotalAfterDiscount(0);
    setCoupon("");
    setTotal(0);
    dispatch(applyCoupon(false));
  };
  const applyDiscountCoupon = async (coupon) => {
    try {
      dispatch(startCart());
      const { totalAfterDiscount } = await applyCouponApi(user.token, {
        coupon,
      });
      setTotalAfterDiscount(totalAfterDiscount);
      dispatch(applyCoupon(true));
      dispatch(finishCart());
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
      dispatch(finishCart());
      dispatch(applyCoupon(false));
    }
  };
  const handleCreateCashOrder = async () => {
    try {
      dispatch(startCart())
      await createCashOrder(user.token, { cod: cart.cod, couponApplied: cart.couponApply });
      dispatch(finishCart());
      dispatch(emptyCart(user.token));
      dispatch(initCart());
      history.push('/user/history');
    } catch (error) {
      dispatch(finishCart())
      toast.error(error.response ? error.response.data : error.message);

    }
  }
  return (
    <Spin spinning={cart.loading}>
      <div className="row">
        {loadingData ? (
          <Spinner></Spinner>
        ) : (
            <>
              <div className="col-md-6">
                <h4>Delivery Address</h4>
                <br />
                <br />
                <AddAddress
                  address={address}
                  setAddress={setAddress}
                  handleAddress={handleAddress}
                ></AddAddress>
                <hr />
                <h4>Got Coupon</h4>
                <br />
                <ApplyCoupon
                  coupon={coupon}
                  disabledBtn={products.length}
                  setCoupon={setCoupon}
                  applyDiscountCoupon={applyDiscountCoupon}
                ></ApplyCoupon>
              </div>
              <div className="col-md-6">
                <h4>Order Summary</h4>
                <hr />
                <h1>{total}</h1>
                <hr />
                <p>Products: {products.length}</p>
                <hr />
                <ProductSummary products={products}></ProductSummary>
                <hr />
                <p>Cart Total : ${total}</p>
                {totalAfterDiscount > 0 && (
                  <>
                    <p className="bg-success p-2">
                      Discount applied!
                      <br />
                      Total payable: ${totalAfterDiscount}
                    </p>
                  </>
                )}
                <div className="row">
                  <div className="col-md-6">
                    {cart.cod ? <button
                      disabled={!hasAddress || !products.length}
                      className="btn btn-primary"
                      onClick={handleCreateCashOrder}
                    >
                      Place Order
                  </button> : <button
                        disabled={!hasAddress || !products.length}
                        className="btn btn-primary"
                        onClick={() => history.push("/payment")}
                      >
                        Place Order
                  </button>}

                  </div>
                  <div className="col-md-6">
                    <button
                      disabled={!products.length}
                      onClick={handleEmptyCart}
                      className="btn btn-primary"
                    >
                      Empty Cart
                  </button>
                  </div>
                </div>
              </div>
            </>
          )}
      </div>
    </Spin>
  );
};
export default Checkout;
