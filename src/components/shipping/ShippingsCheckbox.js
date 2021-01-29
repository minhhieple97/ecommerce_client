import { Checkbox } from "antd";
import React from "react";
const ShippingsCheckbox = ({ handleOnChange, shipping }) => {
  return (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onClick={handleOnChange}
        value="yes"
        checked={shipping === "yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onClick={handleOnChange}
        value="no"
        checked={shipping === "no"}
      >
        No
      </Checkbox>
    </>
  );
};

export default ShippingsCheckbox;
