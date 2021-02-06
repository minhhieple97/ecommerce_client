import { DeleteOutlined } from "@ant-design/icons";
import { Card, Spin } from "antd";
import { Table, Button } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getWishlist, removeWishlist } from "../../services/api/user";
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
];
const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const hasSelected = selectedRowKeys.length > 0;
  const _getWishlist = useCallback(async () => {
    try {
      const { userWishlist } = await getWishlist(user.token);
      setWishlist(userWishlist.wishlist);
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
      await removeWishlist(user.token, id);
      const newWishlist = wishlist.filter((el) => el._id !== id);
      setWishlist(newWishlist);
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
    }
  };
  const showWishlist = () => {
    return (
      <>
        <h4>Wishlist</h4>
        {wishlist.map((p) => (
          <div key={p._id} className="alert alert-secondary">
            <Link to={`/product/${p.slug}`}>{p.title}</Link>
            <span
              onClick={() => handleRemoveFromWishlist(p._id)}
              className="btn btn-sm float-right"
            >
              <DeleteOutlined className="text-danger" />
            </span>
          </div>
        ))}
      </>
    );
  };
  // return (
  //   <div className="container-fluid">
  //     {loading ? (
  //       <Spinner></Spinner>
  //     ) : (
  //         <Spin spinning={loadingSubmit}>
  //           <div className="row">
  //             <div className="col-md-2">
  //               <UserNav></UserNav>
  //             </div>
  //             <div className="col-md-10">
  //               {wishlist.length > 0 ? showWishlist() : <h4 style={{ marginTop: "10px" }} className="text-center" >No wish list found</h4>}
  //             </div>
  //           </div>
  //         </Spin>
  //       )}
  //   </div>
  // );
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
          <Card
          // style={{ marginTop: "5px" }}
          >
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
