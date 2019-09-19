import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { apiService } from "../services/api-service";
import Card from "./Card";
import Search from "./Search";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsArrival, setProductsArrival] = useState([]);
  const [error, setError] = useState(false);

  const fetchProducts = async type => {
    const response = await apiService.getProducts(type);
    if (response.error) {
      return setError(response.error);
    }
    setError(false);
    type === "sold"
      ? setProductsBySell(response)
      : setProductsArrival(response);
  };

  const showError = () =>
    error && <div className="alert alert-danger">{error}</div>;

  useEffect(() => {
    fetchProducts("sold");
    fetchProducts("createdAt");
  }, []);

  return (
    <Layout
      title="Home page"
      description="Node React App"
      className="container-fluid"
    >
      {showError()}
      <Search />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, idx) => (
          <div className="col-4 mb-3" key={idx}>
            <Card product={product} />
          </div>
        ))}
      </div>
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsArrival.map((product, idx) => (
          <div className="col-4 mb-3" key={idx}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
