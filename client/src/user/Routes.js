import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./signup/SignUp";
import Home from "../core/Home";
import SignIn from "./signin/SignIn";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
