import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/stripe/StripeCheckout";
import "../components/stripe/index.css";
const promise = loadStripe(
  "pk_test_51HvGXbK1Wneh2vLA9lbRwjrLK7u6awJHYZjEWwFdrjQu1GSLezMKgIW57AD95dnBThSTtKmSRdVUOhPsluL65NuO00FWpPGuFk"
);
const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout></StripeCheckout>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
