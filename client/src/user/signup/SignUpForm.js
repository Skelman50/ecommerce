import React, { useState } from "react";
import { apiService } from "../../services/api-service";
import ShowMessage from "../helpers/ShowMessage";

const SignUpForm = ({ inputList }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
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
    const response = await apiService.authApi(user, "signup");
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

  return (
    <React.Fragment>
      <ShowMessage error={error} success={success} />
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
