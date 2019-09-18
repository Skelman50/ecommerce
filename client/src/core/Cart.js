import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart } from "./helpers/cart-helpers";
import Card from "./Card";
import Layout from "./Layout";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(getCart());
  }, []);

  const updateCart = cart => {
    setItems(cart);
  };

  const showItems = items => (
    <div>
      <h2>Yor cart has {items.length} items</h2>
      <hr />
      {items.map((p, i) => (
        <Card
          product={p}
          key={i}
          showAddToCart={false}
          cartUpdate={true}
          showRemove={true}
          updateCart={updateCart}
        />
      ))}
    </div>
  );

  const noItemsMessage = () => (
    <h2>
      Your cart is empty <br />
      <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout
      title="Shopping cart"
      description="Manage yor cart items"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} updateCart={updateCart}/>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
