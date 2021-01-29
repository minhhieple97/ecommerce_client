import { Button } from "antd";
import React from "react";
const ApplyCoupon = ({
  coupon,
  setCoupon,
  disabledBtn,
  applyDiscountCoupon,
}) => {
  return (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <Button
        onClick={() => applyDiscountCoupon(coupon)}
        className="btn btn-primary mt-2"
        disabled={!disabledBtn || !coupon || coupon.length < 5}
      >
        Apply
      </Button>
    </>
  );
};
export default ApplyCoupon;
