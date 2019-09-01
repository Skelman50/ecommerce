import React from "react";
import Layout from "../../core/Layout";
import Card from "./Card";
import Links from "./Links";
import { isAuthenticate } from "../../auth/auth";

const AdminDashboard = () => {
  const {
    user: { _id, name, mail, role }
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

  const links = [
    {
      name: "Create Category",
      to: "/create/category"
    },
    {
      name: "Create Product",
      to: "/create/product"
    }
  ];

  return (
    <Layout
      className="container-fluid"
      title="Admin Dashboard"
      description={`${name}'s Dashboard`}
    >
      <div className="row">
        <div className="col-3">
          <Links links={links} text={"Admin links"} />
        </div>
        <div className="col-9">
          <Card text={"Admin Infornation"} list={listInfo} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;