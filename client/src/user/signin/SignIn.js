import React from "react";
import Layout from "../../core/Layout";
import SignInForm from "./SignInForm";

const SignIn = () => {
  const inputList = [
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
      title="Signin"
      description="Signin to Node React App"
      className="container col-md-8 offset-md-2"
    >
      <SignInForm inputList={inputList} />
    </Layout>
  );
};

export default SignIn;