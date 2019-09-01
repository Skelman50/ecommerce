import React from "react";
import { Link } from "react-router-dom";

const Links = ({ links, text }) => {

  const linksMap = () =>
    links.map((item, idx) => (
      <li className="list-group-item" key={idx}>
        <Link className="nav-link" to={item.to}>
          {item.name}
        </Link>
      </li>
    ));
  return (
    <div className="card">
      <h4 className="card-header">{text}</h4>
      <ul className="list-group">{linksMap()}</ul>
    </div>
  );
};

export default Links;
