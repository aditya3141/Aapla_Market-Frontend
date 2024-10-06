import React from "react";
import Layout from "../../Components/Layout/AllLayout";
import Usermenu from "../../Components/Layout/Usermenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid" style={{ overflow: "hidden" }}>
        <div className="row mt-5">
          <div className="col-md-12">
            <Usermenu />
          </div>
          <div className="col-md-12 " style={{ marginLeft: "12%" }}>
            <div className="card w-75 p-3  mt-4">
              <h3 className="p-3 mt-2 border border-bottom">
                Name : {auth?.user?.name}
              </h3>
              <h3 className="p-3 mt-2 border border-bottom">
                Email : {auth?.user?.email}
              </h3>
              <h3 className="p-3 mt-2 border border-bottom">
                Contact : {auth?.user?.phone}
              </h3>
              <h3 className="p-3 mt-2 border border-bottom">
                Address : {auth?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
