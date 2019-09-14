import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { apiService } from "../services/api-service";
import Card from "./Card";

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setrelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = async productId => {
    const product = await apiService.loadSingleProduct(productId);
    if (product.error) {
      return setError(product.error);
    }
    setProduct(product);
    const related = await apiService.listRelated(product._id);
    if (related.error) {
      return setError(related.error);
    }
    setrelatedProduct(related);
  };

  useEffect(() => {
    const {
      match: {
        params: { productId }
      }
    } = props;
    loadSingleProduct(productId);
  }, [props.match.params.productId]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} closeViewButton={true} />
          )}
        </div>
        <div className="col-4">
          <h4>Related product</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3" key={i}>
              <Card product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
