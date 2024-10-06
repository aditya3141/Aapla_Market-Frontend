import React, { useState } from "react";
import Layout from "../Components/Layout/AllLayout";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";

const Payment = () => {
  const [cart, setCart] = useCart();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });

      return total;
    } catch (error) {}
  };

  //handle payments
  const handlePayment = async () => {
    try {
      setVisible(true);
      const { data } = await axios.post("/api/v1/product/payment", {
        cart,
      });

      localStorage.removeItem("cart");
      setCart([]);
    } catch (error) {}
  };
  return (
    <Layout>
      <div>
        {/* payment method section start */}
        <section
          className="payment-method section-lg-b-space"
          style={{ overflowX: "hidden" }}
        >
          <div className="row mt-3 mb-3">
            <NavLink to={"/update-address"} className="col-5">
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
            <h2 className="col-7 mt-2">Payment</h2>
          </div>
          <div className="custom-container">
            <h2 className="fw-semibold theme-color section-t-space">Wallet</h2>
            <div className="payment-list">
              <ul className="cart-add-box payment-card-box gap-0 mt-3">
                <li className="w-100">
                  <div className="payment-detail">
                    <label className="form-label">
                      <img
                        className="img-fluid"
                        src="../../images/svg/google.svg"
                        alt="success-payment"
                      />
                      <span>
                        <span className="fw-normal theme-color">
                          Google Pay
                        </span>
                      </span>
                    </label>
                    <div className="form-check">
                      <h5>Comming Soon...</h5>
                    </div>
                  </div>
                </li>
                <li className="w-100">
                  <div className="payment-detail border-bottom-0">
                    <label className="form-label" htmlFor="six">
                      <img
                        className="img-fluid"
                        src="../../images/svg/wallet.svg"
                        alt="success-payment"
                      />
                      <span>
                        <span className="fw-normal theme-color">
                          Cash on Delivery
                        </span>
                      </span>
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        required
                      />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* payment method section end */}
        {/* pay popup start */}
        <div className="pay-popup">
          <div className="price-items">
            <h6>Total price</h6>
            <h2>{totalPrice()} &#8377;</h2>
          </div>
          <button
            className="btn btn-lg theme-btn pay-btn mt-0"
            onClick={handlePayment}
          >
            Pay Now
          </button>
        </div>
        {/* pay popup end */}
        {/* success payment modal start */}
        <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
          <div className="modal-body">
            <div className="confirm-title text-center">
              <img
                className="img-fluid confirm-offer"
                src="../../images/svg/success.gif"
                alt="success-payment"
              />

              <h1 className="theme-color text-center fw-medium mt-2">
                अभिनंदन !!
              </h1>
              <h5 className="light-text fw-normal lh-base text-center w-100 mt-2 mx-auto">
                तुमची ऑर्डर स्वीकारली आहे. तुमचे आयटम मार्गावर आहेत आणि लवकरच
                पोहोचतील.
              </h5>
            </div>
            <NavLink
              to={"/dashboard/user/orders"}
              className="btn theme-btn w-100 mt-4"
              role="button"
            >
              आत्ता ऑर्डर पहा
            </NavLink>
            <NavLink to={"/"} className="btn gray-btn mt-3">
              खरेदी चालू ठेवा
            </NavLink>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default Payment;
