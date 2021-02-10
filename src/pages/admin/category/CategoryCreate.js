import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import {
  deleteCategory,
  getCategories,
  postCategory,
} from "../../../services/api/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import Spinner from "../../../components/Spinner";
const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const _getCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data);
      }
    };
    _getCategories();
  }, []);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await postCategory({ name });
      setLoading(false);
      toast.success(`"${data.name} is created.`);
      const newCategories = [data, ...categories];
      setCategories(newCategories);
      setName("");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };
  const handleOnChange = (e) => setName(e.target.value);
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const handleRemove = async (slug) => {
    try {
      if (window.confirm("Are you sure you want to delete ?")) {
        setLoading(true);
        await deleteCategory(slug);
        toast.success("Successfully deleted category.");
        const newCategories = [...categories].filter((el) => el.slug !== slug);
        setCategories(newCategories);
        setLoading(false);
      }
    } catch (error) {
      let message = error.response.data ? error.response.data : error.message;
      setLoading(false);
      toast.error(message);
    }
  };

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <Spinner></Spinner>
          ) : (
            <>
              <CategoryForm
                handleSubmit={handleSubmit}
                loading={loading}
                name={name}
                handleOnChange={handleOnChange}
              ></CategoryForm>
              <LocalSearch
                keyword={keyword}
                handleSearch={handleSearch}
              ></LocalSearch>
              {categories.filter(searched(keyword)).map((el) => (
                <div className="alert alert-secondary" key={el._id}>
                  {el.name}
                  <span className="btn btn-sm float-right">
                    <DeleteOutlined
                      onClick={() => handleRemove(el.slug)}
                      className="text-danger"
                    ></DeleteOutlined>
                  </span>
                  <Link to={`/admin/category/${el.slug}`}>
                    <span className="btn btn-sm float-right">
                      <EditOutlined className="text-warning"></EditOutlined>
                    </span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CategoryCreate;
