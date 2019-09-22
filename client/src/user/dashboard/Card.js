import React from "react";
import moment from "moment";

const Card = ({ text, listInfo = false, history = false }) => {
  const listMap = () => {
    if (listInfo) {
      return listInfo.map((item, idx) => (
        <li className="list-group-item" key={idx}>
          {item.name}
        </li>
      ));
    }
    if (history) {
      return history.map(({ products, createdAt }, idx) => (
        <div key={idx}>
          <hr />
          {products.map(({ name, price }, i) => (
            <div key={i}>
              <h6>Product name: {name}</h6>
              <h6>Product price: ${price}</h6>
              <h6>Purchased date: {moment(createdAt).fromNow()}</h6>
            </div>
          ))}
        </div>
      ));
    }
  };

  return (
    <div className="card mb-5">
      <h3 className="card-header">{text}</h3>
      <ul className="list-group">{listMap()}</ul>
    </div>
  );
};

export default Card;
