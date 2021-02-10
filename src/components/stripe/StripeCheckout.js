import React, { useCallback, useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntent } from "../../services/api/payment";
import { Link, useHistory } from "react-router-dom";
import { Card, Spin } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createOrder } from "../../services/api/user";
import { emptyCart, initCart } from "../../store/actions";
const StripeCheckout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { couponApply } = useSelector((state) => state.cart);
  const [succeeded, setSucceeded] = useState(false);

  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const _createPayment = useCallback(async () => {
    try {
      if (!succeeded) {
        const data = await createPaymentIntent({
          couponApply,
        });
        const { clientSecret, cartTotal, totalAfterDiscount, payable } = data;
        setLoading(false);
        setClientSecret(clientSecret);
        setCartTotal(cartTotal);
        setTotalAfterDiscount(totalAfterDiscount);
        setPayable(payable);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      history.push("/");
    }
  }, [couponApply, succeeded, history]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  useEffect(() => {
    _createPayment();
  }, [_createPayment]);
  const handleChange = (e) => {
    setDisable(e.empty);
    setError(e.error ? e.error.message : null);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setProcessing(true);
      setLoading(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: e.target.name.value,
          },
        },
      });
      if (payload.error) {
        setError(`Payment failed ${payload.error.message}`);
        setProcessing(false);
        setLoading(false);
      } else {
        await createOrder({ stripeResponse: payload });
        dispatch(emptyCart());
        dispatch(initCart());
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setProcessing(false);
      setLoading(false);
      setSucceeded(false);
      setError(error.response ? error.response.data : error.message);
    }
  };
  return (
    <Spin spinning={loading}>
      {!succeeded && (
        <div>
          {couponApply && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src="./images/laptop.png"
              alt="cover"
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            ></img>
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        ></Card>
      </div>
      <form id="payment-fom" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        ></CardElement>
        <button
          className="stripe-button"
          disabled={processing || disable || succeeded}
        >
          {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </Spin>
  );
};
export default StripeCheckout;
