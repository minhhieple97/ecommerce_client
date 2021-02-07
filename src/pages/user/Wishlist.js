import { DeleteOutlined } from "@ant-design/icons";
import { Card, Spin } from "antd";
import { Table, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import {
  getWishlist,
  removeProductInWishlist,
} from "../../services/api/wishlist";
const columns = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Preview",
    dataIndex: "preview",
  },
];
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const _getWishlist = useCallback(async () => {
    try {
      const { wishlist } = await getWishlist(user.token);
      const wishlistProduct = wishlist.map((el) => {
        el.product.preview = el.images[0].imageUrl;
        return el.product;
      });
      setWishlist(wishlistProduct);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [user.token]);
  useEffect(() => {
    _getWishlist();
  }, [_getWishlist]);
  const handleRemoveFromWishlist = async (id) => {
    try {
      setLoadingSubmit(true);
      await removeProductInWishlist(user.token, id);
      const newWishlist = wishlist.filter((el) => el._id !== id);
      setWishlist(newWishlist);
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
    }
  };
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  return (
    <>
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <Spin spinning={loadingSubmit}>
          <Card>
            <div>
              <Button
                style={{ marginBottom: "10px" }}
                type="primary"
                disabled={!hasSelected}
                loading={loading}
              >
                Remove
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
              </span>
            </div>
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: onSelectChange,
              }}
              columns={columns}
              dataSource={wishlist}
            />
          </Card>
        </Spin>
      )}
    </>
  );
};
export default Wishlist;
