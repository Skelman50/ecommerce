import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { apiService } from "../../services/api-service";
import ShowMessage from "../helpers/ShowMessage";
import { authenticate, isAuthenticate } from "../../auth/auth";

const SignInForm = ({ inputList }) => {
  const [values, setValues] = useState({
    email: "skelman50@gmail.com",
    password: "111111",
    error: false,
    loading: false,
    redirectToReferrer: false
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticate();

  const handleChange = name => event => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value
    });
  };

  const signin = async user => {
    setValues({ ...values, loading: true });
    const response = await apiService.authApi(user, "signin");
    console.log(response)
    if (response.error) {
      setValues({ ...values, error: response.error, loading: false });
    } else {
      authenticate(response, () => {
        setValues({
          ...values,
          redirectToReferrer: true
        });
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    signin({ email, password });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticate()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <React.Fragment>
      <ShowMessage error={error} loading={loading} />
      {redirectUser()}
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

export default SignInForm;
