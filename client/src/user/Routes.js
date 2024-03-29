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
import Orders from "../admin/orders/Orders";
import Profile from "./profile/Profile";
import ManageProducts from "../admin/manage-products/ManageProducts";
import UpdateProduct from "../admin/update-product/UpdateProduct";

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
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/orders" exact component={Orders} />
        <AdminRoute path="/admin/products" exact component={ManageProducts} />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
