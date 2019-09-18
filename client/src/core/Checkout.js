import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { Link } from "react-router-dom";
import { isAuthenticate } from "../auth/auth";
import { apiService } from "../services/api-service";
import { emptyCart, updateItem } from "./helpers/cart-helpers";

const Checkout = ({ products, updateCart }) => {
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
    const { error, clientToken } = await apiService.getBraintreeClientToken(
      userId,
      token
    );
    if (error) {
      return setData({ ...data, error });
    }
    setData({ clientToken });
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

  const showSuccess = () => (
    <div className="alert alert-info">Thank you. Payment success!</div>
  );

  const buy = async () => {
    try {
      const { nonce } = await data.instanse.requestPaymentMethod();
      const paymentData = { paymentMethodNonce: nonce, amount: getTotal() };
      const { success } = await apiService.processPayment(
        userId,
        token,
        paymentData
      );
      setData({ ...data, success });
      updateCart(emptyCart());
      console.log("payment Success");
    } catch (error) {
      setData({ ...data, error: error.message });
    }
  };

  const showError = () => (
    <div className="alert alert-danger">{data.error}</div>
  );

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: false })}>
      {data.clientToken !== null && products.length > 0 && (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={instanse => (data.instanse = instanse)}
          />
          <button className="btn btn-success btn-block" onClick={buy}>
            Pay
          </button>
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
      {data.error && showError()}
      {data.success && showSuccess()}
      {showCheckOut()}
    </div>
  );
};

export default Checkout;
