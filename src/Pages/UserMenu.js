import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/AllLayout";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

const UserMenu = () => {
  const [auth, setAuth] = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
 useEffect(() => {
    const fetchData = async () => {
      try {
        // Get 'sid' from cookies
        const getCookie = (name) => {
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          if (match) return match[2];
          return null;
        };

        const sid = getCookie('sid'); // Assuming 'sid' is the cookie name

        // If 'sid' exists, make the API request
        if (sid) {
          let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://aapla-market-backend.onrender.com/api/v1/login/sucess',
            headers: {
              'Authorization': `Bearer ${sid}` // Use 'sid' in Authorization header, if needed
            }
          };

          const response = await axios.request(config);
          console.log(JSON.stringify(response.data));

          // Optionally, store the response in local storage or handle it as needed
          // localStorage.setItem('userData', JSON.stringify(response.data));

        } else {
          console.log('No sid cookie found');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call on page load
  }, []);



  const handleLogout = () => {};

  const logout = () => {
    window.open(
      "https://aapla-market-backend.onrender.com/api/v1/google-logout",
      "_self"
    );
    setAuth({
      ...auth,
      user: "null",
      token: "",
    });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <Layout>
      <header className="profile-header section-t-space">
        <div className="custom-container">
          <div className="row mt-3">
            <NavLink to={"/"} className="col-5">
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
            <h1 className="col-7">Profile</h1>
          </div>
          <div className="d-flex align-items-center gap-1 fs-2 ms-2">
            <div className="text-warning mt-3">
              <span className="text-warning "></span>
              <img
                src={data?.user?.image}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                alt=""
              />
            </div>
            <div className="profile-name d-flex align-items-center justify-content-between  w-100 fs-4">
              <h4 className="profile-box text-user  ms-2 d-flex justify-center gap-2 flex-column mt-4">
                <div className="theme-btn fs-6 p-1">
                  {" "}
                  {auth.user?.name || data?.user?.displayName}
                </div>
              </h4>
            </div>
          </div>
        </div>
      </header>

      {/* header end */}
      {/* profile section start */}
      <section className="section-b-space pt-0">
        <div className="custom-container">
          <ul className="profile-list ">
            <li>
              <NavLink to="/" className="profile-box text-user fs-3 ">
                <div className="profile-img"></div>
                <h4>Pages List</h4>
                <i className="ri-arrow-drop-right-line" />
              </NavLink>
            </li>
            {!data?.user && !auth?.user ? (
              <>
                <li>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role || data?.user?.role === 0
                        ? "admin"
                        : "user"
                    }`}
                    className="profile-box text-user fs-3"
                  >
                    <div className="profile-img"></div>
                    <h4>Dashboard</h4>
                    <i className="ri-arrow-drop-right-line" />
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login/" className="profile-box text-user fs-3">
                    <div className="profile-img"></div>
                    <h4>Login</h4>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/register/"
                    className="profile-box text-user fs-3"
                  >
                    <div className="profile-img"></div>
                    <h4>Register</h4>
                    <i className="ri-arrow-drop-right-line" />
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={`/dashboard/${
                      auth?.user?.role || data?.user?.role === 1 || 0
                        ? "admin"
                        : "user"
                    }/orders/`}
                    className="profile-box text-user fs-3"
                  >
                    <div className="profile-img ">
                      <i className="iconsax icon" data-icon="box">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.9991 13.3008C11.8691 13.3008 11.7391 13.2708 11.6191 13.2008L2.78911 8.09083C2.43911 7.88083 2.30911 7.42083 2.51911 7.06083C2.72911 6.70083 3.18911 6.58083 3.54911 6.79083L11.9991 11.6808L20.3991 6.82083C20.7591 6.61083 21.2191 6.74083 21.4291 7.09083C21.6391 7.45083 21.5091 7.91083 21.1591 8.12083L12.3891 13.2008C12.2591 13.2608 12.1291 13.3008 11.9991 13.3008Z"
                            fill="#292D32"
                          />
                          <path
                            d="M12 22.3591C11.59 22.3591 11.25 22.0191 11.25 21.6091V12.5391C11.25 12.1291 11.59 11.7891 12 11.7891C12.41 11.7891 12.75 12.1291 12.75 12.5391V21.6091C12.75 22.0191 12.41 22.3591 12 22.3591Z"
                            fill="#292D32"
                          />
                          <path
                            d="M12.0006 22.75C11.1206 22.75 10.2506 22.56 9.56063 22.18L4.22062 19.21C2.77062 18.41 1.64062 16.48 1.64062 14.82V9.17C1.64062 7.51 2.77062 5.59 4.22062 4.78L9.56063 1.82C10.9306 1.06 13.0706 1.06 14.4406 1.82L19.7806 4.79C21.2306 5.59 22.3606 7.52 22.3606 9.18V14.83C22.3606 16.49 21.2306 18.41 19.7806 19.22L14.4406 22.18C13.7506 22.56 12.8806 22.75 12.0006 22.75ZM12.0006 2.75C11.3706 2.75 10.7506 2.88 10.2906 3.13L4.95062 6.1C3.99062 6.63 3.14063 8.07 3.14063 9.17V14.82C3.14063 15.92 3.99062 17.36 4.95062 17.9L10.2906 20.87C11.2006 21.38 12.8006 21.38 13.7106 20.87L19.0506 17.9C20.0106 17.36 20.8606 15.93 20.8606 14.82V9.17C20.8606 8.07 20.0106 6.63 19.0506 6.09L13.7106 3.12C13.2506 2.88 12.6306 2.75 12.0006 2.75Z"
                            fill="#292D32"
                          />
                        </svg>
                      </i>
                    </div>
                    <div class="profile-details">
                      <h4>Orders</h4>
                      <h5>Ongoing orders, Recent orders..</h5>
                    </div>
                    <i className="ri-arrow-drop-right-line" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={logout}
                    to="/login"
                    className="profile-box text-user fs-3"
                  >
                    <div className="profile-img"></div>
                    <h4 onClick={() => window.location.reload()}>Logout</h4>
                    <i className="ri-arrow-drop-right-line" />
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </section>
      {/* profile section start */}
    </Layout>
  );
};

export default UserMenu;
