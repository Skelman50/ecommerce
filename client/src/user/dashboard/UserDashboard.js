import React from "react";
import Layout from "../../core/Layout";
import { isAuthenticate } from "../../auth/auth";

const UserDashboard = () => {
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

  const listHistory = [
    {
      name: "History"
    }
  ];

  const listMap = list =>
    list.map((item, idx) => (
      <li className="list-group-item" key={idx}>
        {item.name}
      </li>
    ));
  return (
    <Layout
      className="container"
      title="User Dashboard"
      description="User Dashboard"
    >
      <div className="card mb-5">
        <h3 className="card-header">User information</h3>
        <ul className="list-group">{listMap(listInfo)}</ul>
      </div>
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">{listMap(listHistory)}</ul>
      </div>
    </Layout>
  );
};

export default UserDashboard;
