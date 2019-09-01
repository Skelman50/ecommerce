import React from "react";
import Layout from "../../core/Layout";
import UserCard from "./UserCard";
import UserLinks from "./UserLinks";
import { isAuthenticate } from "../../auth/auth";

const UserDashboard = () => {
  const {
    user: { name }
  } = isAuthenticate();
  return (
    <Layout
      className="container-fluid"
      title="User Dashboard"
      description={`${name}'s Dashboard`}
    >
      <div className="row">
        <div className="col-3">
          <UserLinks />
        </div>
        <div className="col-9">
          <UserCard text={"User Infornation"} isInfo={true} />
          <UserCard text={"Purchase history"} />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
