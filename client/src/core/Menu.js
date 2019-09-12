import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../auth/auth";

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
      name: "Home",
      isHome: true
    },
    {
      to: "/shop",
      name: "Shop",
      isShop: true
    },
    {
      to: "/user/dashboard",
      name: "User Dashboard",
      isUserDashboard: true
    },
    {
      to: "/admin/dashboard",
      name: "Admin Dashboard",
      isAdminDashboard: true
    },
    {
      to: "/signin",
      name: "Signin",
      isSign: true
    },
    {
      to: "/signup",
      name: "Signup",
      isSign: true
    },
    {
      name: "Signout",
      isSignout: true
    }
  ];

  const link = item => (
    <Link className="nav-link" to={item.to} style={isActive(history, item.to)}>
      {item.name}
    </Link>
  );

  const isLink = item => {
    const { isSign, isUserDashboard, isAdminDashboard, isHome, isShop } = item;
    if (
      (isSign && !isAuthenticate()) ||
      (isUserDashboard &&
        isAuthenticate() &&
        isAuthenticate().user.role === 0) ||
      (isAdminDashboard &&
        isAuthenticate() &&
        isAuthenticate().user.role === 1) ||
      isHome ||
      isShop
    ) {
      return link(item);
    }
  };

  const linksList = () =>
    links.map((item, idx) => (
      <li className="nav-item" key={idx}>
        {!item.isSignout ? (
          isLink(item)
        ) : (
          <React.Fragment>
            {isAuthenticate() && (
              <span
                className="nav-link"
                style={{ cursor: "pointer", color: "#ffffff" }}
                onClick={() => signout(() => history.push("/"))}
              >
                {item.name}
              </span>
            )}
          </React.Fragment>
        )}
      </li>
    ));

  return <ul className="nav nav-tabs bg-primary">{linksList()}</ul>;
};

export default withRouter(Menu);
