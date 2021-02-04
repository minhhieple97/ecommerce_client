import { DeleteOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserNav from "../../components/nav/UserNav";
import Spinner from "../../components/Spinner";
import { getWishlist, removeWishlist } from "../../services/api/user";
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
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
    return <>
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
  }
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
  return <div className="container-fluid" >
    {
      loading ? <Spinner></Spinner> : <Spin spinning={loadingSubmit} >
        <div className="row" >
          <div className="col-md-2" >
            <UserNav></UserNav>
          </div>
          <div className="col-md-10" >
            <List
              itemLayout="vertical"
              size="large"
              pagination={{
                onChange: page => {
                  console.log(page);
                },
                pageSize: 3,

              }}
              load
              dataSource={listData}
              renderItem={item => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]}

                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>
        </div>
      </Spin>}
  </div>

};
export default Wishlist;
