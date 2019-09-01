import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./signup/SignUp";
import Home from "../core/Home";
import SignIn from "./signin/SignIn";
import UserDashboard from "./dashboard/UserDashboard";
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRouter";
import AdminDashboard from "./dashboard/AdminDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
