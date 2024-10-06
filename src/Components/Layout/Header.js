import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { BiSolidUserCircle } from "react-icons/bi";

const Header = () => {
  const [auth] = useAuth();

  return (
    <div className="div">
      <div
        className="offcanvas sidebar-offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasLeft"
      >
        <div className="offcanvas-header">
          <div className="text-warning mt-2 fs-2">
            <span className="text-warning ">
              <BiSolidUserCircle />
            </span>
          </div>
          <h4 className="mt-3">
            Hello,
            <span className="text-warning fw-bold"> {auth.user?.name}</span>
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="sidebar-content">
            <ul className="link-section">
              <li>
                <div className="pages">
                  <h4>Dark</h4>
                  <div className="switch-btn">
                    <input id="dark-switch" type="checkbox" />
                  </div>
                </div>
              </li>

              <li className="absolute text-center">
                <div className="pages d-flex flex-column align-items-center gap-1">
                  <h2 className="text-warning">आपल मार्केट</h2>
                  <h4>&copy; 2023 Designed and Developed By </h4>
                  <NavLink
                    to={"https://www.instagram.com/aditya_gaikwad1234/"}
                    target="blank"
                    className="text-secondary fw-bold"
                  >
                    Aditya Gaikwad
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <header className="section-t-space">
        <div className="custom-container">
          <div className="header">
            <div className="head-content">
              <button
                className="sidebar-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasLeft"
              >
                <i className="bx bx-menu fs-4" data-icon="menu-hamburger" />
              </button>
              <div className="header-info">
                <img src="../logo.png" alt="" className="object" />
                <h2 className="text-warning">आपल मार्केट</h2>
              </div>
            </div>
            <NavLink to="/" className="notification">
              <i className="bx bx-bell fs-5" data-icon="bell-2" />
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
