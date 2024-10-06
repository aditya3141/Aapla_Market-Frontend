import React from "react";
import Layout from "../Components/Layout/AllLayout";
import { NavLink } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="container text-center mt-5 d-flex flex-column gap-3 align-center">
        <br />
        <h1 className="fs-1 mt-5">404</h1>
        <h3>Oops ! Page Not Found</h3>
        <NavLink to="/" className={"btn btn-secondary w-50 m-auto"}>
          Go Back
        </NavLink>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
