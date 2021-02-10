import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { getProduct, getRelated } from "../../services/api/product";
import { INITIAL_STATE_PRODUCT } from "../../ultil/constants";
import ProductDetail from "./ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { setAuthRedirectPath } from "../../store/actions";
import { Spin } from "antd";
import ProductList from "../../components/product/ProductList";
import {
  addToWishlist,
  checkProductInWishlist,
  removeProductInWishlist,
} from "../../services/api/wishlist";
import {
  createOrUpdateRating,
  getCurrentRatingProductOfUser,
  getListRatingProduct,
} from "../../services/api/rating";
const Product = ({ match, history }) => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({ ...INITIAL_STATE_PRODUCT });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [average, setAverage] = useState(null);
  const [flagWishlist, setFlagWishlist] = useState(false);
  const [loadingRatings, setLoadingRatings] = useState(false);
  const [ratingsData, setRatingsData] = useState({
    ratings: [],
    page: 1,
    limit: 4,
    totalPages: 0,
  });
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
        const { ratings, totalPages, page, limit } = await getListRatingProduct(
          {
            productId: product._id,
          }
        );
        setRatingsData({
          ratings,
          totalPages,
          page,
          limit,
        });
        if (Object.keys(product).length === 0) {
          history.push("/");
        } else {
          setProduct(product);
          if (product.averageStar) setAverage(product.averageStar);
          setListRelated(listRelated);
          if (user._id) {
            const [{ rating }, { flag }] = await Promise.all([
              getCurrentRatingProductOfUser(product._id),
              checkProductInWishlist(product._id),
            ]);
            setFlagWishlist(flag);
            if (rating) {
              setStar(rating.star);
              setReview(rating.review);
            }
          }
          setLoading(false);
        }
      } catch (error) {
        history.push("/");
        setLoading(false);
        console.error(error.message);
      }
    };
    _getProduct();
    // eslint-disable-next-line
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
      console.log("OK");
      if (review.trim() && (review.length < 5 || review.length > 128)) {
        toast.warning(
          "Comments should be at least 5 characters long and must have at most 128 characters."
        );
        return;
      }
      setLoadingSubmit(true);
      setVisible(false);
      const body = { star, productId: product._id };
      if (review) body.review = review;
      const { average } = await createOrUpdateRating(body);
      setStar(star);
      setReview(review);
      setAverage(average);
      const { ratings, totalPages, page, limit } = await getListRatingProduct({
        productId: product._id,
      });
      setRatingsData({
        ratings,
        totalPages,
        page,
        limit,
      });
      toast.success("Update rating success.");
      setLoadingSubmit(false);
    } catch (error) {
      setLoadingSubmit(false);
      toast.error(
        (error.response && error.response.data) ||
          "Sorry something went wrong, please try again :(( "
      );
    }
  };
  const handleChangeWishlist = async (flag) => {
    try {
      if (user._id) {
        setLoadingSubmit(true);
        if (flag) await addToWishlist({ productId: product._id });
        else await removeProductInWishlist({ product: [product._id] });
        setFlagWishlist(flag);
        const message = flag ? "Added to wishlist." : "Deleted to wishlist.";
        toast.success(message);
        setLoadingSubmit(false);
      } else {
        dispatch(setAuthRedirectPath(match.url));
        history.push("/login");
      }
    } catch (error) {
      setLoadingSubmit(false);
      toast.success(error.message);
    }
  };
  const handleChangeReview = async (e) => {
    setReview(e.target.value);
  };
  const handlePaginationRatings = async (pageUpdate) => {
    setLoadingRatings(true);
    const { ratings, totalPages, page, limit } = await getListRatingProduct({
      productId: product._id,
      page: pageUpdate,
    });
    setRatingsData({
      ratings,
      totalPages,
      page,
      limit,
    });
    setLoadingRatings(false);
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
                flagWishlist={flagWishlist}
                average={average}
                loadingRatings={loadingRatings}
                ratingsData={ratingsData}
                handlePaginationRatings={handlePaginationRatings}
                star={star}
                review={review}
                user={user}
                handleChangeRating={handleChangeRating}
                product={product}
                visible={visible}
                handleVisible={handleVisible}
                handleSubmitRating={handleSubmitRating}
                handleChangeWishlist={handleChangeWishlist}
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
