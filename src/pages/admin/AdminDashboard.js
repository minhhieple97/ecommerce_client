import React, { useCallback, useEffect, useState } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { adminOrders, adminUpdateOrder } from "../../services/api/admin";
import AdminOrders from "../../components/admin/AdminOrders";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { Spin } from "antd";
const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const _getOrders = useCallback(async () => {
    try {
      const { orders } = await adminOrders();
      setOrders(orders);
      setLoadingData(false);
    } catch (error) {
      console.log(error.message);
      setLoadingData(false);
    }
  }, []);
  useEffect(() => {
    _getOrders();
  }, [_getOrders]);
  const handleStatusChange = async (orderId, orderStatus) => {
    try {
      setLoading(true);
      await adminUpdateOrder({ orderId, orderStatus });
      _getOrders();
      setLoading(false);
      toast.success("Change order status success.");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="container-fluid">
      {loadingData ? (
        <Spinner></Spinner>
      ) : (
        <>
          <div className="row">
            <div className="col-md-2">
              <AdminNav></AdminNav>
            </div>
            <div className="col-md-10">
              <h4>Admin Dashboard</h4>
              <Spin spinning={loading}>
                <AdminOrders
                  orders={orders}
                  handleStatusChange={handleStatusChange}
                ></AdminOrders>
              </Spin>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
