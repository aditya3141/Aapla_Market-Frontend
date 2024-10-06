import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Adminmenu = () => {
  const navigate = useNavigate();

  const pageLoad = () => {
    navigate(0);
  };
  const activeBtn = "p-3 btn-warning rounded";
  const NormalBtn = "p-3 theme-btn";
  return (
    <div className="d-flex flex-column gap-3 w-50 m-auto">
      <h1 className="text-center mb-2">Admin Panel</h1>
      <NavLink
        to="/dashboard/admin/create-categories/"
        className={({ isActive }) => (isActive ? activeBtn : NormalBtn)}
      >
        Create Categories
      </NavLink>
      <NavLink
        to="/dashboard/admin/create-product/"
        className={({ isActive }) => (isActive ? activeBtn : NormalBtn)}
      >
        Create Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/products/"
        className={({ isActive }) => (isActive ? activeBtn : NormalBtn)}
      >
        Products
      </NavLink>
      <NavLink
        to="/dashboard/admin/orders/"
        className={({ isActive }) => (isActive ? activeBtn : NormalBtn)}
      >
        Orders
      </NavLink>
      <NavLink
        to="/dashboard/admin/users/"
        className={({ isActive }) => (isActive ? activeBtn : NormalBtn)}
      >
        Users
      </NavLink>
      <button
        className="btn btn-secondary w-50 m-auto
      mt-3"
        onClick={pageLoad}
      >
        <h4>Page Not Scroll !</h4>
      </button>
    </div>
  );
};

export default Adminmenu;
