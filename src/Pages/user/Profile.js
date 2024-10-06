import React from "react";
import Layout from "../../Components/Layout/AllLayout";
import Usermenu from "../../Components/Layout/Usermenu";

const Profile = () => {
  return (
    <Layout>
      <div className="col-12">
        <Usermenu />
      </div>
      <div className="col-12">
        <h2>Profile</h2>
      </div>
    </Layout>
  );
};

export default Profile;
