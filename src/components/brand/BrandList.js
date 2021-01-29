import { Radio } from "antd";
import React from "react";
const BrandList = ({ brands, brand, handleOnChange }) => {
  return brands.map((el) => (
    <Radio
      value={el}
      key={el}
      name={el}
      onClick={handleOnChange}
      checked={brand === el}
      className="pb-1 pl-4 pr-4"
    >
      {el}
    </Radio>
  ))
};
export default BrandList;
