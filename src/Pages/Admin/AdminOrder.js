import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Adminmenu from "../../Components/Layout/Adminmenu";
import Layout from "../../Components/Layout/AllLayout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { NavLink } from "react-router-dom";

const { Option } = Select;

const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://aapla-market-backend.vercel.app/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://aapla-market-backend.vercel.app/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      const { data } = await axios.delete(
        `https://aapla-market-backend.vercel.app/api/v1/auth/delete-orders/${orderId}`
      );
      if (data.success) {
        toast.success("Order Deleted Successfully");
        getOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <Adminmenu />
      </div>
      <div
        className="mt-4 w-100"
        style={{ width: "1200px", position: "absolute", left: "0" }}
      >
        <h1 className="text-center mb-4">All Orders</h1>
        {orders.map((order, index) => (
          <div className="border shadow" key={order._id}>
            <table className="table">
              <thead>
                <tr className="table-h">
                  <th scope="col">#</th>
                  <th scope="col">Order ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Buyer</th>
                  <th scope="col">Date</th>

                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-fs">
                  <td>{index + 1}</td>
                  <td>{order._id}</td>
                  <td>
                    <Select
                      bordered={false}
                      onChange={(value) => handleChange(order._id, value)}
                      defaultValue={order.status}
                    >
                      {status.map((s, i) => (
                        <Option key={i} value={s}>
                          {s}
                        </Option>
                      ))}
                    </Select>
                  </td>
                  <td>{order.buyer?.email}</td>
                  <td>
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>

                  <td>
                    <button
                      className="p-2 btn-danger"
                      onClick={() => handleDelete(order._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="container mb-3">
              {order.products.map((p, pIndex) => (
                <div className="custom-container p-4" key={p._id}>
                  <ul className="horizontal-product-list">
                    <li className="cart-product-box">
                      <div className="horizontal-product-box">
                        <div className="horizontal-product-img">
                          <NavLink to={`/product/${p.slug}`}>
                            <img
                              className="img-fluid img"
                              src={`https://aapla-market-backend.vercel.app/api/v1/product/product-photo/${p._id}`}
                              alt={p.name}
                            />
                          </NavLink>
                        </div>
                        <div className="horizontal-product-details">
                          <div className="d-flex align-items-center justify-content-between">
                            <NavLink to={`/product/${p.slug}`}>
                              <h4>{p.name}</h4>
                            </NavLink>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <h3 className="fw-semibold">QTY: {p.qty} ;</h3>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            {p.selectedSize && (
                              <h3 className="fw-semibold">
                                Size: {p.selectedSize} ;
                              </h3>
                            )}
                          </div>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <h3 className="fw-semibold">
                              Price: {p.price} &#8377;
                            </h3>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminOrder;
