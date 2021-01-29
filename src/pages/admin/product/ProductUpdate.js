import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import Resizer from "react-image-file-resizer";
import {
  getCategories,
  getCategoryBySubId,
} from "../../../services/api/category";
import { useSelector } from "react-redux";
import {
  ENUM_BRANDS,
  ENUM_COLORS,
  INITIAL_STATE_PRODUCT,
} from "../../../ultil/constants";
import ProductForm from "../../../components/forms/ProductForm";
import { getProduct, updateProduct } from "../../../services/api/product";
import { deleteImage, uploadImage } from "../../../services/api/upload";
import Spinner from "../../../components/Spinner";
const ProductUpdate = ({ match, history }) => {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [initSubs, setInitSubs] = useState([])
  const [product, setProduct] = useState({ ...INITIAL_STATE_PRODUCT });
  const slug = match.params.slug;
  useEffect(() => {
    const _getInitialData = async () => {
      setLoading(true);
      const [product, categories] = await Promise.all([
        getProduct(slug, user.token),
        getCategories(user.token),
      ]);
      if (Object.keys(product).length === 0) {
        history.push("/admin/product");
      }
      else {
        const subs = await getCategoryBySubId(user.token, product.category._id);
        setLoading(false);
        setProduct((oldState) => ({ ...oldState, ...product }));
        setSubs([...subs]);
        const initSubs = product.subs.reduce((res, el) => {
          res.push(el._id);
          return res;
        }, []);
        setInitSubs([...initSubs])
        setCategories(categories);
      }
    };
    _getInitialData();
  }, [user.token, history, slug]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    const listImage = [];
    if (files && files.length > 0) {
      setLoadingUpload(true);
      for (let index = 0; index < files.length; index++) {
        Resizer.imageFileResizer(
          files[index],
          720,
          720,
          "JPEG",
          100,
          0,
          async (uri) => {
            try {
              const data = await uploadImage({ image: uri }, user.token);
              listImage.push(data);
              setProduct((prod) => ({
                ...prod,
                images: [...prod.images, data],
              }));
              setLoadingUpload(false);
            } catch (error) {
              setLoadingUpload(false);
              toast.error(error.message);
            }
          },
          "base64"
        );
      }
    }
  };
  const handleChangeSubs = (value) => {
    setProduct((prod) => ({ ...prod, subs: [...value] }));
    setInitSubs([...value])
  };
  const handleSubmit = async () => {
    try {
      // setLoading(true);
      const {
        title,
        description,
        price,
        category,
        shipping,
        quantity,
        color,
        brand,
      } = product;
      if (!title || title.length < 2 || title.length > 128) {
        throw new Error("Title of product invalid.");
      }
      if (!description || description.length < 2 || description.length > 256) {
        throw new Error("Description of product invalid.");
      }
      if (!price || price < 2 || price > 1000000) {
        throw new Error("Price of product invalid.");
      }
      if (!quantity || quantity < 2 || quantity > 1000000) {
        throw new Error("Quantity of product invalid.");
      }
      if (!category) {
        throw new Error("Category of product invalid.");
      }
      if (shipping !== "yes" && shipping !== "no") {
        throw new Error("Shipping of product invalid.");
      }
      if (!ENUM_COLORS.includes(color)) {
        throw new Error("Color of product invalid.");
      }
      if (!ENUM_BRANDS.includes(brand)) {
        throw new Error("Brand of product invalid.");
      }
      await updateProduct(user.token, slug, product);
      // setLoading(false);
      toast.success("Update a successful product.");
      history.push('/admin/product/list')
    } catch (error) {
      toast.error((error.response && error.response.data) || error.message);
      setLoading(false);
    }
  };
  const handleRemoveImage = async (imageId) => {
    try {
      setLoadingUpload(true);
      await deleteImage(user.token, imageId);
      const newImages = [...product.images].filter((el) => {
        return el.publicId !== imageId;
      });
      setProduct((prod) => ({ ...prod, images: newImages }));
      setLoadingUpload(false);
    } catch (error) {
      setLoadingUpload(false);
      toast.error(error.message);
    }
  };
  const handleChange = async (e) => {
    //change category
    try {
      const value = e.target.value;
      const key = e.target.name;
      if (key === "category") {
        if (value !== "0") {
          const subs = await getCategoryBySubId(user.token, value);
          setSubs(() => [...subs]);
          setProduct((prod) => ({
            ...prod,
            [key]: value,
            subs: [],
          }));
        } else {
          setSubs([]);
          setProduct((prod) => ({
            ...prod,
            subs: [],
          }));
        }
        setInitSubs([])
      } else {
        setProduct((prod) => ({
          ...prod,
          [key]: value,
        }));
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Sorry something went wrong, please try again.");
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Product update</h3>
          {loading ? (
            <Spinner></Spinner>
          ) : (
              <React.Fragment>
                <hr></hr>
                <ProductForm
                  product={product}
                  handleRemoveImage={handleRemoveImage}
                  handleChange={handleChange}
                  loading={loading}
                  handleSubmit={handleSubmit}
                  listSub={subs}
                  handleChangeSubs={handleChangeSubs}
                  listCategory={categories}
                  handleFileChange={handleFileChange}
                  initSubs={initSubs}
                  loadingUpload={loadingUpload}
                  isUpdate
                ></ProductForm>
              </React.Fragment>
            )}
        </div>
      </div>
    </div>
  );
};
export default ProductUpdate;
