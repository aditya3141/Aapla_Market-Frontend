import React from "react";
import { NavLink } from "react-router-dom";

const Usermenu = () => {
  const activeBtn = "p-3 btn-warning rounded";
  const NormalBtn = "p-3 theme-btn";

  return (
    <div className="d-flex flex-column gap-3 w-50 m-auto">
      <h1 className="text-center">Dashboard</h1>

      <NavLink
        to="/dashboard/user/orders/"
        className={({ isActive }) => (isActive ? activeBtn : NormalBtn)}
      >
        Orders
      </NavLink>
    </div>
  );
};

export default Usermenu;
