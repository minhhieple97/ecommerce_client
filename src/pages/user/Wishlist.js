import { Card, Spin } from "antd";
import { Table, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { Image } from "antd";
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
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const _getWishlist = useCallback(async () => {
    try {
      const { wishlist } = await getWishlist();
      const wishlistProduct = wishlist.map((el) => {
        el.product.preview = (
          <Image width={50} src={el.product.images[0].imageUrl} />
        );
        el.product.key = el.product._id;
        return el.product;
      });
      setWishlistData(wishlistProduct);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    _getWishlist();
  }, [_getWishlist]);
  const handleRemoveFromWishlist = async () => {
    try {
      setLoadingSubmit(true);
      await removeProductInWishlist({ product: selectedRowKeys });
      // const newWishlist = wishlistData.filter((el) => el._id !== id);
      // setWishlistData(newWishlist);
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
    }
  };
  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  console.log({ selectedRowKeys });
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
                onClick={handleRemoveFromWishlist}
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
              locale={{ emptyText: <strong>Wishlist is empty</strong> }}
              columns={columns}
              dataSource={wishlistData}
            />
          </Card>
        </Spin>
      )}
    </>
  );
};
export default Wishlist;
