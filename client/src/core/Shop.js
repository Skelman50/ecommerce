import React from "react";
import Layout from "./Layout";

const Shop = () => {
  return (
    <Layout
      title="Shop page"
      description="Search and find books"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">left side bar</div>
        <div className="col-8">right</div>
      </div>
    </Layout>
  );
};

export default Shop;
