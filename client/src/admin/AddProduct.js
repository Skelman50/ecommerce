import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth/auth";
import { formGroupsList } from "./formGroupList";
import { apiService } from "../services/api-service";

const AddProduct = () => {
  const { user, token } = isAuthenticate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: false,
    createdProduct: "",
    redirectToProfile: false,
    formDara: ""
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  const init = async () => {
    const response = await apiService.getCategories();
    if (response.error) {
      return setValues({ ...values, error: response.error });
    }
    setValues({ ...values, categories: response, formData: new FormData() });
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const showError = () => {
    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }
  };
  const showSuccess = () => {
    if (createdProduct) {
      return (
        <div className="alert aler-info">
          <h2>{`${createdProduct} is created`}</h2>
        </div>
      );
    }
  };

  const showLoading = () => {
    if (loading) {
      return (
        <div className="alert alert-success">
          <h2>Loading...</h2>
        </div>
      );
    }
  };

  const formGroup = () =>
    formGroupsList({
      handleChange,
      description,
      price,
      category,
      quantity,
      name
    }).map((item, idx) => {
      if (item.isTextArea) {
        return (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.labelName}</label>
            <textarea
              className="form-control"
              value={item.value}
              onChange={item.change}
            />
          </div>
        );
      } else if (item.isSelect) {
        return (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.labelName}</label>
            <select className="form-control" onChange={item.change}>
              {item.isShipping ? (
                <React.Fragment>
                  <option>Please select shipping</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <option>Please Select Category</option>
                  {categories &&
                    categories.map((category, idx) => (
                      <option key={idx} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </React.Fragment>
              )}
            </select>
          </div>
        );
      } else {
        return (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.labelName}</label>
            <input
              className="form-control"
              type={item.type}
              value={item.value}
              onChange={item.change}
            />
          </div>
        );
      }
    });

  const handleSubmit = async e => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    const response = await apiService.createProduct(user._id, token, formData);
    if (response.error) {
      return setValues({ ...values, loading: false, error: response.error });
    }
    setValues({
      ...values,
      name: "",
      description: "",
      photo: "",
      price: "",
      quantity: "",
      loading: false,
      error: false,
      createdProduct: response.name
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange("photo")}
          />
        </label>
      </div>
      {formGroup()}
      <button className="btn btn-outline-primary">Create product</button>
    </form>
  );
  return (
    <Layout title="Add new product" description="Create new product">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
