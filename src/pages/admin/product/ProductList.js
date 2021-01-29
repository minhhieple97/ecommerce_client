import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner";
import { deleteProduct, getProducts } from "../../../services/api/product";
import { useSelector } from "react-redux";
import AdminProductList from "../../../components/product/AdminProductList";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const _getProducts = async () => {
    setLoading(true);
    const { products } = await getProducts({ limit: 10 });
    setProducts([...products]);
    setLoading(false);
  };
  useEffect(() => {
    _getProducts();
  }, []);
  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        setLoading(true);
        const data = await deleteProduct(user.token, slug);
        await _getProducts();
        toast.success(`${data.title} is deleted.`);
      } catch (error) {
        console.log(error);
        toast.error(
          (error.response && error.response.data) ||
          `Sorry something went wrong, please try again.`
        );
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav></AdminNav>
        </div>
        <div className="col">
          {loading ? (
            <Spinner></Spinner>
          ) : (
              <>
                <div className="row">
                  <AdminProductList products={products} handleRemove={handleRemove} ></AdminProductList>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductsAdmin;
