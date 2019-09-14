import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem } from "./helpers/cart-helpers";

const Card = ({ product, closeViewButton }) => {
  const [redirect, setRedirect] = useState(false);
  const {
    name,
    description,
    price,
    _id,
    category,
    createdAt,
    quantity
  } = product;
  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtocard = () => (
    <button className="btn btn-outline-warning mt2- mb-2" onClick={addToCart}>
      Add to card
    </button>
  );

  const showViewButton = () =>
    !closeViewButton && (
      <Link to={`/product/${_id}`} className="mr-2">
        <button className="btn btn-outline-primary mt2- mb-2 mr-2">
          View Product
        </button>
      </Link>
    );

  const showStock = () =>
    quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out Of stock</span>
    );

  return (
    <div className="card">
      <div className="card-header name">{name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={{ name, _id }} url="products/once" />
        <p className="lead mt-4">{description.substring(0, 100)}</p>
        <p className="black-10">${price}</p>
        <p className="black-9">Category: {category && category.name}</p>
        <p className="black-8">Added on {moment(createdAt).fromNow()}</p>
        {showStock()}
        <br />
        {showViewButton()}
        {showAddtocard()}
      </div>
    </div>
  );
};

export default Card;
