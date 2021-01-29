import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].imageUrl : '/images/laptop.png'}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
          alt='cover'
        ></img>
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          <EditOutlined className="text-warning"></EditOutlined>
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => handleRemove(slug)}
        ></DeleteOutlined>,
      ]}
    >
      <Meta
        title={title}
        description={description && description.substring(0, 10)}
      ></Meta>
    </Card>
  );
};

export default AdminProductCard;
