import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders } from "../../services/api/user";
import Spinner from "../../components/Spinner";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import Invoice from "../../components/Invoice";
const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const _getOrders = useCallback(async () => {
    try {
      const orders = await getOrders();
      setOrders(orders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  }, []);
  useEffect(() => {
    _getOrders();
  }, [_getOrders]);
  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order}></Invoice>}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );
  const showOrderInTable = (order) => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
          </tr>
        </thead>
        <tbody>
          {order.products.map((p, i) => {
            return (
              <tr key={p._id}>
                <td>
                  <b>{p.product.title}</b>
                </td>
                <td>{p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.product.color}</td>
                <td>{p.count}</td>
                <td>
                  {p.product.shipping === "yes" ? (
                    <CheckCircleOutlined
                      style={{ color: "green" }}
                    ></CheckCircleOutlined>
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: "red" }}
                    ></CloseCircleOutlined>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
  const showPurchaseOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={order._id} className="m-5 p-3 card">
        <ShowPaymentInfo order={order}></ShowPaymentInfo>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <div className="col">{showDownloadLink(order)}</div>
          </div>
        </div>
      </div>
    ));
  return (
    <div className="container-fluid">
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          <h4 style={{ marginTop: "10px" }}>
            {orders.length > 0 ? "User purchase orders" : "No purchase orders"}
          </h4>
          {showPurchaseOrders()}
        </>
      )}
    </div>
  );
};
export default History;
