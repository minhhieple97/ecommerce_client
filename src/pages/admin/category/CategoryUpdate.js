import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategory, updateCategory } from "../../../services/api/category";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/CategoryForm";
import Spinner from "../../../components/Spinner";
const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const _getCategory = async () => {
      try {
        setLoading(true)
        const { params } = match;
        const { slug } = params;
        const data = await getCategory(slug);
        const { category } = data
        if (!category) {
          history.push("/admin/category");
        }
        else {
          setName(category.name);
          setLoading(false)
        }
      } catch (error) {
        toast.error((error.response && error.response.data) || 'Sorry something went wrong, please try again :(( ');
      }

    };
    _getCategory();
  }, [match, history]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const slug = match.params.slug;
      await updateCategory(user.token, slug, { name });
      setLoading(false);
      toast.success(`"category is updated.`);
      history.push("/admin/category");
    } catch (error) {
      setLoading(false);
      toast.error((error.response && error.response.data) || 'Sorry something went wrong, please try again :(( ');
    }
  };
  const handleOnChange = (e) => setName(e.target.value);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>Category Update</h1>
          {loading ? <Spinner></Spinner> : <>
            <CategoryForm
              loading={loading}
              name={name}
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
            ></CategoryForm>
          </>}
        </div>
      </div>
    </div>
  );
};
export default CategoryUpdate;
