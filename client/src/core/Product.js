import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { apiService } from "../services/api-service";
import Card from "./Card";

const Product = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);

  const loadSingleProduct = async productId => {
    const response = await apiService.loadSingleProduct(productId);
    if (response.error) {
      return setError(response.error);
    }
    setProduct(response);
  };

  useEffect(() => {
    const {
      match: {
        params: { productId }
      }
    } = props;
    loadSingleProduct(productId);
  }, []);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        {product && product.description && (
          <Card product={product} closeViewButton={true} />
        )}
      </div>
    </Layout>
  );
};

export default Product;
