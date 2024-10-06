import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Layout from "../../Components/Layout/AllLayout";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  // form fn

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/forgot-password`, {
        email,
        question,
        newPassword,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);

        navigate("/login/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <div className="auth-body container">
        <br />
        <div className="text-warning fs-4 text-center">
          Welcome To Aapla Market App
        </div>
        <br />
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="custom-container">
            <div className="form-group">
              <label className="form-label">Email id</label>
              <div className="form-input mb-4">
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  placeholder="Enter Your Email"
                  required
                />
                <i className="iconsax icons" data-icon="mail" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Fevorite Person</label>
              <div className="form-input mb-4">
                <input
                  type="text"
                  className="form-control"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                  id="address"
                  placeholder="Enter Your Fevorite Person"
                  required
                />
                <i className="iconsax icons" data-icon="user-1" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <div className="form-input">
                <input
                  type="text"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  id="password"
                  placeholder="Enter Your New Password"
                  required
                />
                <i className="iconsax icons" data-icon="key" />
              </div>
              <div className="contact-btn">
                <button type="submit" className="btn auth-btn w-100">
                  Reset Password
                </button>
              </div>
              <div className="division">
                <span>OR</span>
              </div>
              <h4 className="signup pt-0">
                <NavLink to="/register/"> Create a Account</NavLink> To
                Aapla-Market
              </h4>
            </div>
            ;
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPass;
