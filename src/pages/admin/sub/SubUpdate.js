import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories } from "../../../services/api/category";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/CategoryForm";
import { getSub, updateSub } from "../../../services/api/sub";
import Spinner from "../../../components/Spinner";
const SubUpdate = ({ history, match }) => {
  const [sub, setSub] = useState({});
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState(null);
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const _getSub = async () => {
      try {
        const { params } = match;
        const { slug } = params;
        setLoading(true)
        const [data, categories] = await Promise.all([
          getSub(slug),
          getCategories(user.token),
        ]);
        const { sub } = data
        if (!sub) {
          history.push("/admin/sub-category/");
        }
        else {
          setSub(sub);
          setCategories(categories);
          setParent(sub.parent);
          setLoading(false)
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false)
        toast.error('Sorry something went wrong, please try again )):')
      }

    };
    _getSub();
  }, [match, user.token, history]);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const slug = match.params.slug;
      const data = await updateSub(user.token, slug, {
        name: sub.name,
        parent,
      });
      setLoading(false);
      toast.success(`"${data.name} is updated.`);
      history.push("/admin/sub-category");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };
  const handleOnChange = (e) => {
    setSub((sub) => ({ ...sub, name: e.target.value }));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          <h1>Sub category update</h1>
          {loading ? <Spinner></Spinner> : <>
            <div className="form-group">
              <label htmlFor="parent">Parent category</label>
              {categories.length > 0 && (
                <select
                  value={parent}
                  onChange={(e) => setParent(e.target.value)}
                  className="form-control"
                  name="category"
                >
                  <option key={null} value={null}>
                    Please select
                </option>
                  {categories.map((el) => {
                    return (
                      <option
                        key={el._id}
                        value={el._id}
                        defaultValue={el._id === parent}
                      >
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
            <CategoryForm
              loading={loading}
              name={sub.name}
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
            ></CategoryForm>
          </>}
        </div>
      </div>
    </div>
  );
};
export default SubUpdate;
