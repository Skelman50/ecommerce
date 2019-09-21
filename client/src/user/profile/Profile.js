import React, { useState, useEffect } from "react";
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
  const { token } = isAuthenticate();

  const init = async userId => {
    const { error, name, email } = await apiService.getUserInfo(userId, token);
    if (error) {
      return setValues({ ...values, error });
    }
    setValues({ ...values, name, email });
  };

  const handleClickSubmit = e => {
    e.preventDefaut();
  };

  const handleChange = e => {};
  const profileUpdate = (name, email, password) => (
    <form>
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
      <button onClick={handleClickSubmit}>Submit</button>
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
      {profileUpdate(name, email, password)}
    </Layout>
  );
};

export default Profile;
