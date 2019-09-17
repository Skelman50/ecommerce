import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/auth";
import { apiService } from "../services/api-service";

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: false,
    instanse: {},
    address: ""
  });

  const userId = isAuthenticate() && isAuthenticate().user._id;
  const token = isAuthenticate() && isAuthenticate().token;

  const getToken = async (userId, token) => {
    const {
      error,
      clientToken,
      success
    } = await apiService.getBraintreeClientToken(userId, token);
    if (error) {
      return setData({ ...data, error });
    }
    setData({ ...data, clientToken, success });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);
  const getTotal = () => {
    return products.reduce(
      (total, { count, price }) => total + count * price,
      0
    );
  };

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 && (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken
            }}
            onInstance={instanse => (data.instanse = instanse)}
          />
          <button className="btn btn-success">Checkout</button>
        </div>
      )}
    </div>
  );

  const showCheckOut = () =>
    isAuthenticate() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  return (
    <div>
      <h2>Total: ${getTotal()}</h2>
      {showCheckOut()}
    </div>
  );
};

export default Checkout;
