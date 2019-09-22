import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../../core/Layout";
import { apiService } from "../../services/api-service";
import { isAuthenticate } from "../../auth/auth";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const {
    user: { _id },
    token
  } = isAuthenticate();

  const loadProducts = async () => {
    const response = await apiService.getAdminProducts();
    if (response.error) {
      console.log(response.error);
    } else {
      setProducts(response);
    }
  };

  const deleteProduct = async productId => {
    const response = await apiService.deleteProduct(_id, productId, token);
    if (response.error) {
      console.log(response.error);
    } else {
      loadProducts();
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const listMap = () =>
    products.map((p, i) => (
      <Fragment key={i}>
        <li className="list-group-item">
          <strong>{p.name}</strong>
          <Link to={`/admin/product/update/${p._id}`}>
            <span className="badge badge-warning badge-pill">Update</span>
          </Link>
          <span
            className="badge badge-danger badge-pill"
            onClick={() => deleteProduct(p._id)}
          >
            Delete
          </span>
        </li>
      </Fragment>
    ));

  return (
    <Layout
      className="container-fluid"
      title="Manage Products"
      description="Manage Products"
    >
      <div className="row">
        <h2 className="mb-4">Total products: {products.length}</h2>
        <div className="col-12">
          <hr />
          <ul className="list-group">{listMap()}</ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
