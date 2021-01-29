import { Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminNav from "../../../components/nav/AdminNav";
import Spinner from "../../../components/Spinner";
import {
  getCoupons,
  postCoupon,
  removeCoupon,
} from "../../../services/api/coupon";
import { DeleteOutlined } from "@ant-design/icons";
const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [coupons, setCoupons] = useState([]);
  const _getCoupons = useCallback(async () => {
    setLoadingData(true);
    const coupons = await getCoupons();
    setCoupons([...coupons]);
    setLoadingData(false);
  }, []);
  useEffect(() => {
    _getCoupons();
  }, [_getCoupons]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log({ name, expiry, discount, loading });
      const coupon = { name, expiry, discount };
      await postCoupon(user.token, { coupon });
      toast.success("Create discount success");
    } catch (error) {
      toast.error("Sorry something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleRemove = async (id) => {
    try {
      setLoading(true);
      await removeCoupon(id, user.token);
      _getCoupons();
      setLoading(false);
      toast.success("Remove coupon success");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      {loadingData ? (
        <Spinner></Spinner>
      ) : (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNav />
              </div>
              <div className="col-md-10">
                <h4>Coupon</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input
                      className="form-control"
                      value={name}
                      min={6}
                      required
                      maxLength={12}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Discount %</label>
                    <input
                      min={1}
                      maxLength={3}
                      required
                      value={discount}
                      type="number"
                      max={100}
                      className="form-control"
                      onChange={(e) => setDiscount(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="text-muted">Expiry</label>
                    <br />
                    <DatePicker
                      className="form-control"
                      selected={new Date()}
                      value={expiry}
                      onChange={(date) => setExpiry(date)}
                      required
                    ></DatePicker>
                  </div>
                  <button className="btn btn-outline-primary">Save</button>
                </form>
                <hr />
                <h4>{coupons.length} Coupons</h4>
                {coupons.length ? (
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Expiry</th>
                        <th scope="col">Discount</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {coupons.map((c) => (
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>{new Date(c.expiry).toLocaleDateString()}</td>
                          <td>{c.discount}%</td>
                          <td>
                            <DeleteOutlined
                              onClick={() => handleRemove(c._id)}
                              className="text-danger pointer"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <h4 className="text-center">No coupon found</h4>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Spin>
  );
};

export default CreateCoupon;
