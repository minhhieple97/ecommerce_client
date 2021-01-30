import { Radio } from "antd";
import React from "react";
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};
const BrandList = ({ brands, brand, handleOnChange }) => {
  return brands.map((el) => (
    <Radio
      style={radioStyle}
      value={el}
      key={el}
      name={el}
      onClick={handleOnChange}
      checked={brand === el}
      className="pb-1 pl-4 pr-4"
    >
      {el}
    </Radio>
  ));
};
export default BrandList;
