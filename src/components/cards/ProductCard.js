import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, toggleSideDraw } from "../../store/actions";
import Rating from "../Rating";
const ProductCard = ({ product }) => {
  const { images, title, description, slug, price } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (product.quantity > 1) {
      dispatch(addToCart(product));
      setTooltip("Added");
      dispatch(toggleSideDraw(true));
    }
  };
  return (
    <>
      {product && product.averageStar ? (
        <Rating average={product.averageStar}></Rating>
      ) : (
          <div className="text-center pt-1 pb-3">No review yet</div>
        )}
      <Card
        cover={
          <img
            src={
              images && images.length
                ? images[0].imageUrl
                : "/images/laptop.png"
            }
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
            alt="cover"
          ></img>
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning"></EyeOutlined> <br /> View
            Product
          </Link>,
          <Tooltip title={tooltip}>
            <div onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger"></ShoppingCartOutlined>{" "}
              <br /> {product.quantity > 1 ? "Add to Cart" : "Out of Stock"}
            </div>
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${title} - $${price}`}
          description={description && description.substring(0, 10)}
        ></Meta>
      </Card>
    </>
  );
};
export default ProductCard;
