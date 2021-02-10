import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories } from "../../../services/api/category";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import { deleteSub, getSubs, postSub } from "../../../services/api/sub";
import Spinner from "../../../components/Spinner";
const SubCreate = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const _getCategories = async () => {
      try {
        setLoading(true);
        const [categories, subCategories] = await Promise.all([
          getCategories(),
          getSubs(),
        ]);
        setCategories(categories);
        setSubs(subCategories);
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
      if (!category) {
        throw new Error("Please choose parent category");
      }
      if (!name) {
        throw new Error("Please input name for category");
      }
      const data = await postSub({ name, parent: category });
      setLoading(false);
      toast.success(`"${data.name} is created.`);
      const newSubCategories = [data, ...subs];
      setSubs(newSubCategories);
      setName("");
    } catch (error) {
      setLoading(false);
      toast.error((error.response && error.response.data) || error.message);
    }
  };
  const handleOnChange = (e) => setName(e.target.value);
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  const handleRemove = async (slug) => {
    try {
      if (window.confirm("Are you sure you want to delete ?")) {
        setLoading(true);
        await deleteSub(slug);
        toast.success("Successfully deleted sub category.");
        const newSubCategories = [...subs].filter((el) => el.slug !== slug);
        setSubs(newSubCategories);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(
        (error.response && error.response.data) || "Delete sub category failed!"
      );
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
              <div className="form-group">
                <label htmlFor="parent">Parent category</label>
                {categories.length > 0 && (
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-control"
                    name="category"
                  >
                    <option key={null} value={null}>
                      Please select value
                    </option>
                    {categories.map((el) => {
                      return (
                        <option key={el._id} value={el._id}>
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              <CategoryForm
                handleSubmit={handleSubmit}
                loading={loading}
                name={name}
                category={category}
                handleOnChange={handleOnChange}
              ></CategoryForm>
              <LocalSearch
                keyword={keyword}
                handleSearch={handleSearch}
              ></LocalSearch>
              {subs.filter(searched(keyword)).map((el) => (
                <div className="alert alert-secondary" key={el._id}>
                  {el.name}
                  <span className="btn btn-sm float-right">
                    <DeleteOutlined
                      onClick={() => handleRemove(el.slug)}
                      className="text-danger"
                    ></DeleteOutlined>
                  </span>
                  <Link to={`/admin/sub-category/${el.slug}`}>
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
export default SubCreate;
