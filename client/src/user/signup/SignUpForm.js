import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiService } from "../../services/api-service";

const SignUpForm = ({ inputList }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const { name, email, password, error, success } = values;

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  };

  const signup = async user => {
    const response = await apiService.signUpService(user);
    if (response.error) {
      setValues({ ...values, error: response.error, success: false });
    } else {
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        error: false,
        success: true
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    signup({ name, email, password });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account was create. Please <Link to="/signin">signin</Link>.
    </div>
  );

  return (
    <React.Fragment>
      {showError()}
      {showSuccess()}
      <form>
        {inputList.map((item, idx) => (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.name}</label>
            <input
              type={item.type}
              className="form-control"
              onChange={handleChange(item.type)}
              value={values[item.type]}
            />
          </div>
        ))}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};

export default SignUpForm;
