import React from "react";
import { Link, withRouter } from "react-router-dom";
import { type } from "os";
import { signout } from "../user/helpers/auth";

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
    },
    {
      name: "Signout",
      isSignout: true
    }
  ];

  const linksList = () =>
    links.map((item, idx) => (
      <li className="nav-item" key={idx}>
        {!item.isSignout ? (
          <Link
            className="nav-link"
            to={item.to}
            style={isActive(history, item.to)}
          >
            {item.name}
          </Link>
        ) : (
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#ffffff" }}
            onClick={() => signout(() => history.push("/"))}
          >
            {item.name}
          </span>
        )}
      </li>
    ));

  return <ul className="nav nav-tabs bg-primary">{linksList()}</ul>;
};

export default withRouter(Menu);
