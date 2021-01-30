import { Radio } from "antd";
import React from "react";
const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px",
};
const ColorList = ({ handleOnChange, colors, color }) => {
  return colors.map((el) => (
    <Radio
      style={radioStyle}
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
