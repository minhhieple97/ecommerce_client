import { Checkbox } from "antd";
import React from "react";
const CategoryCheckBox = ({ categories, handleOnChange, categoryIds }) => {
  return categories.map((category) => {
    return (
      <div key={category._id}>
        <Checkbox
          onChange={handleOnChange}
          className="pb-2 pl-4 pr-4"
          name={category._id}
          checked={categoryIds.includes(category._id)}
        >
          {category.name}
          <br />
        </Checkbox>
      </div>
    );
  });
};
export default CategoryCheckBox;
