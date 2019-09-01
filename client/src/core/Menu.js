import React from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  const {
    location: { pathname }
  } = history;
  if (path === pathname) {
    return { color: "#ff9900" };
  }
  return { color: "#ffffff" };
};

const Menu = ({ history }) => {
  const links = [
    {
      to: "/",
      name: "Home"
    },
    {
      to: "/signin",
      name: "Signin"
    },
    {
      to: "/signup",
      name: "Signup"
    }
  ];

  const linksList = () =>
    links.map((item, idx) => (
      <li className="nav-item" key={idx}>
        <Link
          className="nav-link"
          to={item.to}
          style={isActive(history, item.to)}
        >
          {item.name}
        </Link>
      </li>
    ));

  return <ul className="nav nav-tabs bg-primary">{linksList()}</ul>;
};

export default withRouter(Menu);
