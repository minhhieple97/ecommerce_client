import { Radio } from "antd";
import React from "react";
const ColorList = ({ handleOnChange, colors, color }) => {
  return colors.map((el) => (
    <Radio
      value={el}
      key={el}
      name={el}
      checked={color === el}
      onClick={handleOnChange}
      className="pb-1 pl-4 pr-4"
    >
      {el}
    </Radio>
  ));
};
export default ColorList;
