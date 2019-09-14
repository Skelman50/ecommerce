import React from "react";

const Card = ({ text, list }) => {
  console.log(list)
  const listMap = list =>
    list.map((item, idx) => (
      <li className="list-group-item" key={idx}>
        {item.name}
      </li>
    ));

  return (
    <div className="card mb-5">
      <h3 className="card-header">{text}</h3>
      <ul className="list-group">{listMap(list)}</ul>
    </div>
  );
};

export default Card;
