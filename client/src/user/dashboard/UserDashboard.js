import React, { useState, useEffect } from "react";
import Layout from "../../core/Layout";
import Card from "./Card";
import Links from "./Links";
import { isAuthenticate } from "../../auth/auth";
import { apiService } from "../../services/api-service";

const UserDashboard = () => {
  const {
    user: { name, mail, role, _id },
    token
  } = isAuthenticate();

  const [history, setHistory] = useState([]);

  const init = async () => {
    const response = await apiService.getPurchase(_id, token);
    if (response.error) {
      console.log(response.error);
    } else {
      setHistory(response);
    }
  };

  useEffect(() => {
    init();
  }, []);

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
          <Card text={"User Infornation"} listInfo={listInfo} />
          <Card text={"Purchase history"} history={history} />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
