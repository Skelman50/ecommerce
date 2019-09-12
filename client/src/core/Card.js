import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({ product: { name, description, price, _id } }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{name}</div>
        <div className="card-body">
          <ShowImage item={{ name, _id }} url="products/once" />
          <p>{description}</p>
          <p>${price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt2- mb-2 mr-2">
              View Product
            </button>
          </Link>
          <button className="btn btn-outline-warning mt2- mb-2">
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
