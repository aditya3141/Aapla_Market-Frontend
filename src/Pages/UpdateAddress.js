import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout/AllLayout";
import { useAuth } from "../context/auth";
import { Modal } from "antd";

const UpdateAddress = () => {
  const [auth, setAuth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint using Axios
        const response = await axios.get(
          "https://aapla-market-backend.onrender.com/api/v1/login/sucess",
          {
            withCredentials: true,
          }
        );
        // Once data is fetched, update the state
        setData(response.data);
      } catch (error) {
        // If an error occurs, update the state with the error
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    name: auth.user?.name || "",
    phone: auth.user?.phone || "",
    address: auth.user?.address || "",
    city: "Kolhapur", // Pre-selected city
    state: "Maharashtra", // Pre-selected state
    postalCode: "",
  });

  // Valid postal codes
  const validPostalCodes = ["416230", "416231"];

  // Handle form data change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated address
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Postal code validation
    if (!validPostalCodes.includes(formData.postalCode)) {
      alert("We cannot deliver to your area.");
      return;
    }

    try {
      const response = await axios.put(
        "https://aapla-market-backend.onrender.com/api/v1/auth/update-address",
        {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        }
      );
      if (response.data.success) {
        setAuth({ ...auth, user: { ...auth.user, ...formData } });
        setVisible(false); // Close modal after successful update
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <Layout>
      {/* shipping details section start */}
      <section className="shipping-details-sec" style={{ overflowX: "hidden" }}>
        <div className="row mt-2 mb-5">
          <NavLink to={"/cart"} className="col-5">
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
          <h2 className="text-center">Update Address</h2>
        </div>
        <div className="custom-container">
          <ul className="address-list">
            <li>
              <div className="shipping-address">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadio1"
                      id="radio1"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="radio1">
                      My Address
                    </label>
                  </div>
                </div>
                <div className="address-details">
                  <p>{auth.user?.address}</p>
                  <div className="options">
                    <span
                      className="iconsax icons edit-add"
                      onClick={() => setVisible(true)}
                    ></span>
                  </div>
                  <Modal
                    onCancel={() => setVisible(false)}
                    footer={null}
                    open={visible}
                  >
                    <form onSubmit={handleFormSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="city"
                          name="city"
                          value={formData.city}
                          disabled // City is pre-selected and not editable
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value={formData.state}
                          disabled // State is pre-selected and not editable
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <button type="submit" className="btn theme-btn w-100">
                        Save Address
                      </button>
                    </form>
                  </Modal>
                  <h5 className="content-number">
                    Address : <span> {data?.user?.address}</span>
                  </h5>
                  <h5 className="content-number">
                    Phone no. : <span> {data?.user?.phone}</span>
                  </h5>
                </div>
              </div>
            </li>
          </ul>
          <a onClick={() => setVisible(true)} className="btn gray-btn w-100">
            + Add Address
          </a>

          <NavLink to={"/payment"} className="btn theme-btn w-100">
            Continue
          </NavLink>
        </div>
      </section>
      {/* shipping details section end */}
    </Layout>
  );
};

export default UpdateAddress;
