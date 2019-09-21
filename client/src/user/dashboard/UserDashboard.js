import React from "react";
import Layout from "../../core/Layout";
import Card from "./Card";
import Links from "./Links";
import { isAuthenticate } from "../../auth/auth";

const UserDashboard = () => {
  const {
    user: { name, mail, role, _id }
  } = isAuthenticate();

  const listInfo = [
    {
      name
    },
    {
      name: mail
    },
    {
      name: role === 1 ? "Admin" : "Registered User"
    }
  ];

  const listHistory = [
    {
      name: "History"
    }
  ];

  const links = [
    {
      name: "My cart",
      to: "/cart"
    },
    {
      name: "Update Profile",
      to: `/profile/${_id}`
    }
  ];

  return (
    <Layout
      className="container-fluid"
      title="User Dashboard"
      description={`${name}'s Dashboard`}
    >
      <div className="row">
        <div className="col-3">
          <Links links={links} text={"User links"} />
        </div>
        <div className="col-9">
          <Card text={"User Infornation"} list={listInfo} />
          <Card text={"Purchase history"} list={listHistory} />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
