import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import Layout from "../../Components/Layout/AllLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // form fn

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `https://aapla-market-backend.onrender.com/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("तुम्ही काही तरी चुकत आहात !");
    }
  };

  const loginwithgoogle = () => {
    window.open(
      "https://aapla-market-backend.onrender.com/api/v1/auth/google/callback",
      "_self"
    );
  };
  return (
    <Layout>
      <div className="auth-body container">
        <br />
        <div className="text-warning fs-6 fw-bold text-center">
          आपलं मार्केट ॲप वर आपलंं स्वागत आहे
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
                  placeholder="तुमचा ईमेल टाका"
                  required
                />
                <i className="iconsax icons" data-icon="mail" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input">
                <input
                  type="text"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  id="password"
                  placeholder="तुमचा पासवर्ड टाका"
                  required
                />
                <i className="iconsax icons" data-icon="key" />
              </div>

              <div className="contact-btn">
                <button type="submit" className="btn auth-btn w-100">
                  Login
                </button>
                <div className="division pb-0 mb-0">
                  <span>OR</span>
                </div>
                <a
                  href="javascript:void(0);"
                  className="btn gap-2 btn-thin btn-lg btn-light w-100 mb-2 rounded-xl"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "20px" }}
                  >
                    <g clipPath="url(#clip0_54_4200)">
                      <path
                        d="M4.43242 12.5863L3.73625 15.1852L1.19176 15.239C0.431328 13.8286 0 12.2149 0 10.5C0 8.84179 0.403281 7.27804 1.11812 5.90112H1.11867L3.38398 6.31644L4.37633 8.56815C4.16863 9.17366 4.05543 9.82366 4.05543 10.5C4.05551 11.2341 4.18848 11.9374 4.43242 12.5863Z"
                        fill="#FBBB00"
                      />
                      <path
                        d="M19.8253 8.63184C19.9401 9.23676 20 9.86148 20 10.5C20 11.2159 19.9247 11.9143 19.7813 12.5879C19.2945 14.8802 18.0225 16.8818 16.2605 18.2983L16.2599 18.2978L13.4066 18.1522L13.0028 15.6313C14.172 14.9456 15.0858 13.8725 15.5671 12.5879H10.2198V8.63184H15.6451H19.8253Z"
                        fill="#518EF8"
                      />
                      <path
                        d="M16.2599 18.2978L16.2604 18.2984C14.5467 19.6758 12.3698 20.5 10 20.5C6.19177 20.5 2.8808 18.3715 1.19177 15.239L4.43244 12.5863C5.27693 14.8401 7.45111 16.4445 10 16.4445C11.0956 16.4445 12.122 16.1484 13.0027 15.6313L16.2599 18.2978Z"
                        fill="#28B446"
                      />
                      <path
                        d="M16.3829 2.80219L13.1434 5.45437C12.2319 4.88461 11.1544 4.55547 9.99998 4.55547C7.39338 4.55547 5.17853 6.23348 4.37635 8.56812L1.11865 5.90109H1.1181C2.7824 2.6923 6.13513 0.5 9.99998 0.5C12.4263 0.5 14.6511 1.3643 16.3829 2.80219Z"
                        fill="#F14336"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_54_4200">
                        <rect
                          width={40}
                          height={40}
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span
                    onClick={loginwithgoogle}
                    style={{ fontSize: "16px", fontWeight: "500" }}
                  >
                    Fast Login
                  </span>
                </a>

                <br />
              </div>
              <div className="division">
                <span></span>
              </div>
              <h4 className="signup pt-0" style={{ lineHeight: "1.9" }}>
                Designed and Developed by <br /> Aditya Gaikwad &copy; 2024-2025
                To Aapla Market
              </h4>
            </div>
            ;
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
