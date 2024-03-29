import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../../core/Layout";
import { apiService } from "../../services/api-service";
import { isAuthenticate } from "../../auth/auth";
import { inputList } from "./input-list";

const Profile = ({
  match: {
    params: { userId }
  }
}) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false
  });

  const { name, email, error, success, password } = values;
  const { token, role } = isAuthenticate();

  const init = async userId => {
    const { error, name, email } = await apiService.getUserInfo(userId, token);
    if (error) {
      return setValues({ ...values, error });
    }
    setValues({ ...values, name, email });
  };

  const handleClickSubmit = async e => {
    e.preventDefault();
    const {
      error,
      name: Name,
      email: Email
    } = await apiService.updateUserProfile(userId, token, {
      name,
      email,
      password
    });
    if (error) {
      return setValues({ ...values, error });
    }
    apiService.updateUser({ error, name, email, _id: userId, role }, () => {
      setValues({ ...values, name: Name, email: Email, success: true });
    });
  };

  const redirectUser = () => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  const handleChange = name => e => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const profileUpdate = (name, email, password) => (
    <form onSubmit={handleClickSubmit}>
      {inputList(name, email, password).map(({ value, type, name }, i) => (
        <div className="form-group" key={i}>
          <label className="text-muted">{name}</label>
          <input
            className="form-control"
            type="text"
            value={value}
            onChange={handleChange(type)}
          />
        </div>
      ))}
      <button className="btn btn-outline-primary">Submit</button>
    </form>
  );

  useEffect(() => {
    init(userId, token);
  }, []);

  return (
    <Layout
      title="Profile"
      description="Update your profile"
      classname="container-fluid"
    >
      <h2>Profile Update</h2>
      {redirectUser()}
      {profileUpdate(name, email, password)}
    </Layout>
  );
};

export default Profile;
