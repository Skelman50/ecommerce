import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { apiService } from "../services/api-service";
import Card from "./Card";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsArrival, setProductsArrival] = useState([]);
  const [error, setError] = useState(false);

  const fetchProducts = async type => {
    const response = await apiService.getProducts(type);
    if (response.error) {
      return setError(response.error);
    }
    type === "sold"
      ? setProductsBySell(response)
      : setProductsArrival(response);
  };

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
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productsBySell.map((product, idx) => (
          <Card product={product} key={idx} />
        ))}
      </div>
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row">
        {productsArrival.map((product, idx) => (
          <Card product={product} key={idx} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
