import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";

const Card = ({
  product: { name, description, price, _id },
  closeViewButton
}) => {
  return (
    <div className="card">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <ShowImage item={{ name, _id }} url="products/once" />
        <p>{description.substring(0, 100)}</p>
        <p>${price}</p>
        {!closeViewButton && (
          <Link to={`/product/${_id}`} className="mr-2">
            <button className="btn btn-outline-primary mt2- mb-2 mr-2">
              View Product
            </button>
          </Link>
        )}
        <button className="btn btn-outline-warning mt2- mb-2">
          Add to card
        </button>
      </div>
    </div>
  );
};

export default Card;
