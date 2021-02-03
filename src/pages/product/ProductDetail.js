import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Comment, Tabs, Tooltip } from "antd";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import ProductInfo from "./ProductInfo";
import StarRating from "react-star-ratings";
import RatingModal from "../../components/modal/RatingModal";
import Ratings from "../../components/Ratings";
import { useDispatch } from "react-redux";
import { addToCart, toggleSideDraw } from "../../store/actions";
import Editor from "../../components/editor/Editor";
import Reviews from "../../components/reviews/Reviews";
import PaginationList from "../../components/PaginationList";

const { TabPane } = Tabs;
const ProductDetail = ({
  product,
  handleChangeRating,
  user,
  visible,
  handleVisible,
  star,
  review,
  handleSubmitRating,
  handleAddToWishlist,
  handleChangeReview
}) => {
  const { images, title, description, _id, quantity } = product;
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
        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <div className="container">
              <div className="row">
                <Reviews></Reviews>
              </div>
              <div className="row" style={{ marginTop: "30px" }}>
                <PaginationList
                  page={1}
                  totalPages={4}
                  handleOnChange={() => { }}
                  simple={true}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="More" key="3">
            Call use on 0889644797 to learn more about this product.
          </TabPane>
        </Tabs>
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          <Ratings p={product}></Ratings>
        ) : (
            <div className="text-center pt-1 pb-3">No rating yet</div>
          )}
        <Card
          actions={[
            <Tooltip title={tooltip}>
              <div onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success"></ShoppingCartOutlined>{" "}
                <br /> {quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </div>
            </Tooltip>,
            <div onClick={() => handleAddToWishlist()}>
              <HeartOutlined className="text-info"></HeartOutlined> <br />
              Add to Wishlist
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
