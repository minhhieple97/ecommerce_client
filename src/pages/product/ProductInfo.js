import React from "react";
import { Link } from "react-router-dom";
import { Tag } from 'antd';
const ProductInfo = ({ product }) => {
  const {
    price,
    category,
    subs,
    quantity,
    sold,
    color,
    shipping,
    brand,
  } = product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill pull-xs-right">
          ${price}
        </span>
      </li>
      <li className="list-group-item">
        Category{" "}
        <Link
          to={`/category/${category.slug}`}
          className="label label-default label-pill pull-xs-right"
        >
          <Tag style={{ margin: 0, cursor: "pointer" }} color="gold"> {category.name}</Tag>

        </Link>
      </li>
      <li className="list-group-item">
        Sub Categories{" "}
        {subs.map((sub) => {
          return (
            <Link
              key={sub._id}
              to={`/sub-category/${sub.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              <Tag style={{ cursor: "pointer", margin: 0 }} color="purple">{sub.name}</Tag>
            </Link>
          );
        })}
      </li>
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>
      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>
      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>
      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>
    </ul>
  );
};

export default ProductInfo;
