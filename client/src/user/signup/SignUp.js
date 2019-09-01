import React from "react";
import Layout from "../../core/Layout";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  const inputList = [
    {
      name: "Name",
      type: "name"
    },
    {
      name: "Email",
      type: "email"
    },
    {
      name: "Password",
      type: "password"
    }
  ];
  return (
    <Layout
      title="Signup"
      description="Signup to Node React App"
      className="container col-md-8 offset-md-2"
    >
      <SignUpForm inputList={inputList} />
    </Layout>
  );
};

export default SignUp;
