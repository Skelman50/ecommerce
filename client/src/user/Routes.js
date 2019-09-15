import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./signup/SignUp";
import Home from "../core/Home";
import SignIn from "./signin/SignIn";
import UserDashboard from "./dashboard/UserDashboard";
import PrivateRoute from "../auth/PrivateRoute";
import AdminRoute from "../auth/AdminRouter";
import AdminDashboard from "./dashboard/AdminDashboard";
import AddCategory from "../admin/add-category/AddCategory";
import AddProduct from "../admin/add-product/AddProduct";
import Shop from "../core/Shop";
import Product from "../core/Product";
import Cart from "../core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
