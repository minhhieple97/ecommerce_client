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
import { postProduct } from "../../../services/api/product";
import { deleteImage, uploadImage } from "../../../services/api/upload";
const ProductCreate = () => {
  const [product, setProduct] = useState({ ...INITIAL_STATE_PRODUCT });
  const [loading, setLoading] = useState(false);
  const [listSub, setListSub] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const _getCategories = async () => {
      const categories = await getCategories(user.token);
      setListCategory([...categories]);
    };
    _getCategories();
  }, [user.token]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
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
      await postProduct(user.token, product);
      setLoading(false);
      toast.success("Create a successful product.");
      setProduct(INITIAL_STATE_PRODUCT);
    } catch (error) {
      toast.error((error.response && error.response.data) || error.message);
      setLoading(false);
    }
  };
  const handleRemoveImage = async (imageId) => {
    try {
      setLoading(true);
      await deleteImage(user.token, imageId);
      const newImages = [...product.images].filter((el) => {
        return el.publicId !== imageId;
      });
      setProduct((prod) => ({ ...prod, images: newImages }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const listImage = [];
    if (files && files.length > 0) {
      setLoading(true);
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
              setLoading(false);
            } catch (error) {
              setLoading(false);
              toast.error(error.message);
            }
          },
          "base64"
        );
      }
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
          setListSub(() => [...subs]);
          setProduct((prod) => ({
            ...prod,
            [key]: value,
            subs: [],
          }));
        } else {
          setListSub([]);
          setProduct((prod) => ({
            ...prod,
            subs: [],
          }));
        }
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
  const handleChangeSubs = async (value) => {
    //change sub category
    setProduct((prod) => ({ ...prod, subs: [...value] }));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h3>Product create</h3>
          <hr></hr>
          <ProductForm
            product={product}
            handleRemoveImage={handleRemoveImage}
            handleChange={handleChange}
            loading={loading}
            handleSubmit={handleSubmit}
            listSub={listSub}
            handleChangeSubs={handleChangeSubs}
            listCategory={listCategory}
            handleFileChange={handleFileChange}
          ></ProductForm>
        </div>
      </div>
    </div>
  );
};
export default ProductCreate;
