import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticate } from "../auth/auth";
import { formGroupsList } from "./formGroupList";

const AddProduct = () => {
  const { user, token } = isAuthenticate;
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

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
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
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </React.Fragment>
              ) : (
                <option value="5d6958fba1126b2742ac41c8">Node</option>
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

  const handleSubmit = e => {
    e.preventDefault();
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
        <div className="col-md-8 offset-md-2">{newPostForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
