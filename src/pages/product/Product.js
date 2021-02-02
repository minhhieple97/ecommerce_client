import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import {
  getProduct,
  getRelated,
  ratingProduct,
} from "../../services/api/product";
import { INITIAL_STATE_PRODUCT } from "../../ultil/constants";
import ProductDetail from "./ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { setAuthRedirectPath } from "../../store/actions";
import { Spin } from "antd";
import ProductList from "../../components/product/ProductList";
import { addToWishlist } from "../../services/api/user";
const Product = ({ match, history }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({ ...INITIAL_STATE_PRODUCT });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [listRelated, setListRelated] = useState([]);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");
  const { slug } = match.params;
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const _getProduct = async () => {
      try {
        setLoading(true);
        const [product, listRelated] = await Promise.all([
          getProduct(slug),
          getRelated(slug),
        ]);
        if (Object.keys(product).length === 0) {
          history.push("/");
        } else {
          setLoading(false);
          setProduct(() => {
            if (user._id) {
              const existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
              );
              if (existingRatingObject) {
                setStar(existingRatingObject.star);
                setReview(existingRatingObject.review);
              }
            }
            return { ...product };
          });
          setListRelated(listRelated);
        }
      } catch (error) {
        setLoading(false);
        console.error(error.message);
      }
    };
    _getProduct();
  }, [slug, history, user._id]);
  const handleChangeRating = (rating) => {
    setStar(rating);
  };
  const handleVisible = (visible) => {
    if (user._id) {
      setVisible(visible);
    } else {
      dispatch(setAuthRedirectPath(match.url));
      history.push("/login");
    }
  };
  const handleSubmitRating = async () => {
    try {
      if (review.trim() && (review.length < 5 || review.length > 128)) {
        toast.warning(
          "Comments should be at least 5 characters long and must have at most 128 characters."
        );
        return;
      }
      setLoadingSubmit(true);
      setVisible(false);
      const body = { star };
      if (review) body.review = review;
      await ratingProduct(user.token, product._id, body);
      toast.success("Update rating success.");
      const _getProduct = async () => {
        try {
          const product = await getProduct(slug);
          if (Object.keys(product).length === 0) {
            history.push("/");
          } else {
            setProduct(() => {
              if (user._id) {
                const existingRatingObject = product.ratings.find(
                  (ele) => ele.postedBy.toString() === user._id.toString()
                );
                if (existingRatingObject) {
                  setStar(existingRatingObject.star);
                  setReview(existingRatingObject.review);
                }
              }
              return { ...product };
            });
          }
        } catch (error) {
          console.error(error.message);
        }
      };
      _getProduct();
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
      toast.error(
        (error.response && error.response.data) ||
          "Sorry something went wrong, please try again :(( "
      );
    }
  };
  const handleAddToWishlist = async () => {
    try {
      if (user._id) {
        setLoadingSubmit(true);
        await addToWishlist(user.token, { productId: product._id });
        toast.success("Added to wishlist");
        setLoadingSubmit(false);
        history.push("/user/wishlist");
      } else {
        dispatch(setAuthRedirectPath(match.url));
        history.push("/login");
      }
    } catch (error) {
      setLoadingSubmit(false);
    }
  };
  const handleChangeReview = async (e) => {
    setReview(e.target.value);
  };
  return (
    <div className="container-fluid">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Spin spinning={loadingSubmit}>
            <div className="row pt-4">
              <ProductDetail
                star={star}
                review={review}
                user={user}
                handleChangeRating={handleChangeRating}
                product={product}
                visible={visible}
                handleVisible={handleVisible}
                handleSubmitRating={handleSubmitRating}
                handleAddToWishlist={handleAddToWishlist}
                handleChangeReview={handleChangeReview}
              ></ProductDetail>
            </div>
            <div className="row">
              <div className="col text-center pt-5 pb-5">
                <hr />
                <h4>Related products</h4>
                <hr />
              </div>
            </div>
            <div className="row pb-5">
              {listRelated.length ? (
                <>
                  <ProductList products={listRelated}></ProductList>
                </>
              ) : (
                <div className="text-center col">No Products Found</div>
              )}
            </div>
          </Spin>
        </>
      )}
    </div>
  );
};
export default Product;
