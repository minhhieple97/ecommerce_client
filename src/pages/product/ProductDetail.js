import { DeleteOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Comment, Spin, Tabs, Tooltip } from "antd";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../../components/modal/RatingModal";
import Rating from "../../components/Rating";
import { useDispatch } from "react-redux";
import { addToCart, toggleSideDraw } from "../../store/actions";
import Editor from "../../components/editor/Editor";
import Ratings from "../../components/ratings/Ratings";
import PaginationList from "../../components/PaginationList";

const { TabPane } = Tabs;
const ProductDetail = ({
  product,
  average,
  handleChangeRating,
  user,
  visible,
  handleVisible,
  star,
  review,
  handleSubmitRating,
  handleChangeWishlist,
  handleChangeReview,
  ratingsData,
  handlePaginationRatings,
  loadingRatings,
  flagWishlist
}) => {
  const { images, title, description, _id, quantity } = product;
  const { ratings, page, totalPages } = ratingsData;
  const [tooltip, setTooltip] = useState("Click to add");
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(addToCart(product));
      setTooltip("Added");
      dispatch(toggleSideDraw(true));
    }
  };
  return (
    <React.Fragment>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images.map((image) => {
              return (
                <img
                  key={image.publicId}
                  src={image.imageUrl}
                  alt="cover"
                ></img>
              );
            })}
          </Carousel>
        ) : (
            <Card
              cover={
                <img
                  src="/images/laptop.png"
                  className="mb-3 card-image"
                  alt="cover"
                ></img>
              }
            ></Card>
          )}
        <Tabs type="card" defaultActiveKey="2">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <div className="container">
              {ratings && ratings.length > 0 ? (
                <Spin spinning={loadingRatings}>
                  <div className="row">
                    <Ratings
                      totalRating={product.totalRating}
                      content={ratings}
                    ></Ratings>
                  </div>
                  <div className="row" style={{ marginTop: "30px" }}>
                    <PaginationList
                      page={page}
                      totalPages={totalPages}
                      handleOnChange={handlePaginationRatings}
                      simple={true}
                    />
                  </div>
                </Spin>
              ) : (
                  <p>This product has no reviews yet.</p>
                )}
            </div>
          </TabPane>
          <TabPane tab="More" key="3">
            Call use on 0889644797 to learn more about this product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {average ? (
          <Rating average={average}></Rating>
        ) : (
            <div className="text-center pt-1 pb-3">No review yet</div>
          )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success"></ShoppingCartOutlined>{" "}
                <br /> {quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </div>
            </Tooltip>,
            <div onClick={() => handleChangeWishlist(!flagWishlist)}>
              {!flagWishlist ? <><HeartOutlined className="text-info"></HeartOutlined> <br />
              Add to Wishlist</> : <><DeleteOutlined></DeleteOutlined><br />
              Remove to Wishlist</>}

            </div>,
            <RatingModal
              user={user}
              handleVisible={handleVisible}
              visible={visible}
              handleSubmitRating={handleSubmitRating}
            >
              <StarRating
                rating={star}
                starRatedColor="red"
                isSelectable={true}
                changeRating={handleChangeRating}
                numberOfStars={5}
                name={_id}
              />
              <Comment
                content={
                  <Editor onChange={handleChangeReview} value={review} />
                }
              />
            </RatingModal>,
          ]}
        >
          <ProductInfo product={product}></ProductInfo>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
