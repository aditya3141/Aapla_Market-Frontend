import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://aapla-market-backend.vercel.app/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      await axios.put(
        `https://aapla-market-backend.vercel.app/api/v1/auth/order-status/${orderId}`,
        {
          status: "Cancelled",
        }
      );
      getOrders(); // Refresh orders after cancellation
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusSteps = (order) => ({
    "Not Process": [
      {
        name: "Order Received",
        completed: true,
        date: moment(order.createdAt).format("h:mm a | DD MMM, YYYY"),
      },
      { name: "Order Processing", completed: false },
      { name: "Ready to Ship", completed: false },
      { name: "Shipped", completed: false },
      { name: "Delivered", completed: false },
    ],
    Processing: [
      {
        name: "Order Received",
        completed: true,
        date: moment(order.createdAt).format("h:mm a | DD MMM, YYYY"),
      },
      {
        name: "Order Processing",
        completed: true,
        date: moment(order.statusDates?.Processing).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      { name: "Ready to Ship", completed: false },
      { name: "Shipped", completed: false },
      { name: "Delivered", completed: false },
    ],
    Shipped: [
      {
        name: "Order Received",
        completed: true,
        date: moment(order.createdAt).format("h:mm a | DD MMM, YYYY"),
      },
      {
        name: "Order Processing",
        completed: true,
        date: moment(order.statusDates?.Processing).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      {
        name: "Ready to Ship",
        completed: true,
        date: moment(order.statusDates?.ReadyToShip).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      {
        name: "Shipped",
        completed: true,
        date: moment(order.statusDates?.Shipped).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      { name: "Delivered", completed: false },
    ],
    Delivered: [
      {
        name: "Order Received",
        completed: true,
        date: moment(order.createdAt).format("h:mm a | DD MMM, YYYY"),
      },
      {
        name: "Order Processing",
        completed: true,
        date: moment(order.statusDates?.Processing).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      {
        name: "Ready to Ship",
        completed: true,
        date: moment(order.statusDates?.ReadyToShip).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      {
        name: "Shipped",
        completed: true,
        date: moment(order.statusDates?.Shipped).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      {
        name: "Delivered",
        completed: true,
        date: moment(order.statusDates?.Delivered).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
    ],
    Cancelled: [
      {
        name: "Order Received",
        completed: true,
        date: moment(order.createdAt).format("h:mm a | DD MMM, YYYY"),
      },
      {
        name: "Order Processing",
        completed: true,
        date: moment(order.statusDates?.Processing).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
      { name: "Ready to Ship", completed: false },
      { name: "Shipped", completed: false },
      { name: "Delivered", completed: false },
      {
        name: "Cancelled",
        completed: true,
        date: moment(order.statusDates?.Cancelled).format(
          "h:mm a | DD MMM, YYYY"
        ),
      },
    ],
  });

  const generatePDF = (order) => {
    const doc = new jsPDF();

    // Add title and order details
    doc.setFontSize(18);
    doc.text("Aapla Market", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(`Order Receipt`, 105, 30, null, null, "center");
    doc.text(`Order ID: ${order._id}`, 20, 40);
    doc.text(
      `Order Date: ${moment(order.createdAt).format("h:mm a | DD MMM, YYYY")}`,
      20,
      50
    );
    doc.text(`Order Status: ${order.status}`, 20, 60);

    // Prepare table
    const tableData = order.products.map((product, index) => [
      index + 1,
      product.name,
      `₹${product.price}`,
    ]);
    const tableHeaders = [["#", "Product Name", "Price"]];

    // Add table to document
    doc.autoTable({
      head: tableHeaders,
      body: tableData,
      startY: 70,
      theme: "grid",
    });

    doc.save(`Order_${order._id}.pdf`);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div className="col-12 mt-4">
        <div className="row mt-3 mb-3">
          <NavLink to={"/user-menu"} className="col-5">
            <span className="product-back">
              <i className="iconsax back-btn" data-icon="arrow-left">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57141 18.8211C9.38141 18.8211 9.19141 18.7511 9.04141 18.6011L2.97141 12.5311C2.68141 12.2411 2.68141 11.7611 2.97141 11.4711L9.04141 5.40109C9.33141 5.11109 9.81141 5.11109 10.1014 5.40109C10.3914 5.69109 10.3914 6.17109 10.1014 6.46109L4.56141 12.0011L10.1014 17.5411C10.3914 17.8311 10.3914 18.3111 10.1014 18.6011C9.96141 18.7511 9.76141 18.8211 9.57141 18.8211Z"
                    fill="#292D32"
                  />
                  <path
                    d="M20.5019 12.75H3.67188C3.26188 12.75 2.92188 12.41 2.92188 12C2.92188 11.59 3.26188 11.25 3.67188 11.25H20.5019C20.9119 11.25 21.2519 11.59 21.2519 12C21.2519 12.41 20.9119 12.75 20.5019 12.75Z"
                    fill="#292D32"
                  />
                </svg>
              </i>
            </span>
          </NavLink>
          <h2 className="col-7 mt-2">Your Orders</h2>
        </div>
        {orders.map((order, index) => (
          <div key={order._id} className="border shadow mb-4">
            <div className="custom-container p-3">
              <h4 className="light-text fw-normal">
                {moment(order.createdAt).format(" DD MMM, YYYY")}
              </h4>
              <div className="order-id d-flex justify-content-between gap-2 mt-2">
                <h4 className="theme-color fw-medium">
                  Order ID: #{order._id}
                </h4>
                <h4 className="theme-color fw-semibold">
                  {order.products?.map((product, i) => (
                    <span className="light-text fw-normal" key={product._id}>
                      Amount: ₹{product.price}
                    </span>
                  ))}
                </h4>
              </div>
              <div className="order-tracking">
                <h2 className="mb-3">Order Journey</h2>
                <ul>
                  {(getStatusSteps(order)[order.status] || []).map(
                    (status, i) => (
                      <li
                        key={i}
                        className={`order-process ${
                          status.completed ? "completed" : ""
                        }`}
                      >
                        <div className="d-flex gap-3 w-100">
                          <span>
                            {status.completed ? (
                              <img
                                className="process-icon"
                                src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/chack.svg"
                                alt="check"
                              />
                            ) : (
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.0013 13.3008C11.8713 13.3008 11.7413 13.2709 11.6213 13.2009L2.79132 8.09088C2.43132 7.88088 2.3113 7.42085 2.5213 7.06085C2.7313 6.70085 3.1813 6.58083 3.5513 6.79083L12.0013 11.6808L20.4013 6.82086C20.7613 6.61086 21.2213 6.74088 21.4313 7.09088C21.6413 7.45088 21.5113 7.91085 21.1613 8.12085L12.3813 13.2109C12.2613 13.2709 12.1313 13.3008 12.0013 13.3008Z"
                                  fill="#FD7E14"
                                />
                                <path
                                  d="M12 22C10.92 22 9.86002 21.73 8.95002 21.21L3.96002 18.39C2.74002 17.71 1.98002 16.41 1.98002 15V9.00002C1.98002 7.82002 2.72001 6.51003 3.96002 5.83003L8.95002 3.01001C10.3 2.27001 11.7 2.27001 13.05 3.01001L18.04 5.83003C19.26 6.51003 20.02 7.80002 20.02 9.00002V15C20.02 16.18 19.28 17.49 18.04 18.17L13.05 20.99C12.15 21.73 11.07 22 12 22ZM12 4.00003C11.5 4.00003 10.99 4.10002 10.52 4.36002L5.53002 7.18003C4.82002 7.57003 4.48002 8.27003 4.48002 9.00002V15C4.48002 15.73 4.81002 16.43 5.53002 16.82L10.52 19.64C11.23 20.03 12.27 20.03 12.98 19.64L17.97 16.82C18.68 16.43 19.02 15.73 19.02 15V9.00002C19.02 8.27003 18.69 7.57003 17.97 7.18003L12.98 4.36002C12.51 4.10002 12.01 4.00003 11.5 4.00003Z"
                                  fill="#FD7E14"
                                />
                              </svg>
                            )}
                          </span>
                          <div>
                            <h6>{status.name}</h6>
                            <p className="mb-0">{status.date}</p>
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="button-container mt-3">
                {order.status === "Delivered" && (
                  <button
                    className="btn btn-success"
                    onClick={() => generatePDF(order)}
                  >
                    Download Receipt
                  </button>
                )}
                {order.status !== "Delivered" &&
                  order.status !== "Cancelled" && (
                    <button
                      className="btn btn-danger"
                      onClick={() => cancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
