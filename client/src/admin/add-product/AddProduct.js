import React, { useEffect, useState } from "react";
import Layout from "../../core/Layout";
import { isAuthenticate } from "../../auth/auth";
import { apiService } from "../../services/api-service";
import FormGroup from "./FormGroup";

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
    quantity,
    loading,
    error,
    createdProduct,
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
      category: "",
      shipping: "",
      loading: false,
      error: false,
      createdProduct: response.name
    });
    console.log("asdasdad");
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
      <FormGroup
        handleChange={handleChange}
        description={description}
        price={price}
        category={category}
        quantity={quantity}
        name={name}
        categories={categories}
      />
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
