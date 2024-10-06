import React from "react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/cart";

const Footer = () => {
  const [cart] = useCart();

  return (
    <div>
      <section className="panel-space" />
      <div className="navbar-menu">
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className={isActive ? "active" : ""}>
                <div className="icon">
                  <img
                    className="unactive"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/home.svg"
                    alt="home"
                  />
                  <img
                    className="active"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/home-fill.svg"
                    alt="home"
                  />
                </div>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/category"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className={isActive ? "active" : ""}>
                <div className="icon">
                  <img
                    className="unactive"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/categories.svg"
                    alt="categories"
                  />
                  <img
                    className="active"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/categories-fill.svg"
                    alt="categories"
                  />
                </div>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className={isActive ? "active" : ""}>
                <div className="badge rounded-circle badge-danger text-danger bg-light position-absolute fs-7">
                  {cart?.length}
                </div>
                <div className="icon">
                  <img
                    className="unactive"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/bag.svg"
                    alt="bag"
                  />
                  <img
                    className="active"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/bag-fill.svg"
                    alt="bag"
                  />
                </div>
              </li>
            )}
          </NavLink>
          <NavLink
            to="/user-menu"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {({ isActive }) => (
              <li className={isActive ? "active" : ""}>
                <div className="icon">
                  <img
                    className="unactive"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/profile.svg"
                    alt="profile"
                  />
                  <img
                    className="active"
                    src="https://themes.pixelstrap.com/fuzzy/assets/images/svg/profile-fill.svg"
                    alt="profile"
                  />
                </div>
              </li>
            )}
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
