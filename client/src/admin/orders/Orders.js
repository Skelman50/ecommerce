import React, { useState, useEffect } from "react";
import moment from "moment";
import { apiService } from "../../services/api-service";
import Layout from "../../core/Layout";
import { isAuthenticate } from "../../auth/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const {
    user: { _id, name },
    token
  } = isAuthenticate();
  const loadOrders = async (_id, token) => {
    const response = await apiService.listOrders(_id, token);
    if (response.error) {
      console.log(response.error);
    } else {
      setOrders(response);
    }
  };

  useEffect(() => {
    loadOrders(_id, token);
  });

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
        <input className="font-control" type="text" value={value} readOnly />
      </div>
    </div>
  );

  const noOrders = () => !orders.length && <h4>No orders</h4>;
  const showOrdersLength = () =>
    orders.length && (
      <h1 className="text-danger display-2">Total orders: {orders.length} </h1>
    );
  return (
    <Layout
      title="Orders"
      description={`Hello ${name}. You can manage all th orders!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {noOrders()}
          {showOrdersLength()}
          {orders.map((o, i) => (
            <div
              className="mt-5"
              key={i}
              style={{ borderBottom: "5px solid indigo" }}
            >
              <h2 className="mb-5">
                <span className="bg-primary"> Order ID: {o._id}</span>
              </h2>
              <ul className="list-group mb-2">
                <li className="list-group-item">{o.status}</li>
                <li className="list-group-item">
                  Transaction ID: {o.transaction_id}
                </li>
                <li className="list-group-item">Amount: {o.amount}</li>
                <li className="list-group-item">Ordered by: {o.user.name}</li>
                <li className="list-group-item">
                  Ordered on: {moment(o.createdAt).fromNow()}
                </li>
                <li className="list-group-item">
                  Delivery address: {o.address}
                </li>
              </ul>

              <h3 className="mt-4 mb-4 font-italic">
                Total products in the order: {o.products.length}
              </h3>

              {o.products.map((p, idx) => (
                <div
                  className="mb-4"
                  key={idx}
                  style={{ padding: "20px", border: "1px solid indigo" }}
                >
                  {showInput("product name", p.name)}
                  {showInput("product price", p.price)}
                  {showInput("product total", p.count)}
                  {showInput("product Id", p._id)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
