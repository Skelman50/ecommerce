import React, { useState } from "react";
import { isAuthenticate } from "../auth/auth";
import Layout from "../core/Layout";
import { apiService } from "../services/api-service";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticate();

  const handleChange = e => {
    setError(false);
    setName(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    const response = await apiService.addCategory(user._id, token, { name });
    if (response.error) {
      return setError(response.error);
    }
    setError(false);
    setSuccess(true);
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} was created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} should be unique</h3>;
    }
  };

  return (
    <Layout
      title="Add a new category"
      description={`Hello ${user.name}. Ready to add a new category?`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
