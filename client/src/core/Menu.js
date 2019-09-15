import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticate } from "../auth/auth";
import { itemTotal } from "./helpers/cart-helpers";

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
      to: "/cart",
      name: `Cart`,
      isCart: true
    },
    {
      name: "Signout",
      isSignout: true
    }
  ];

  const link = item => (
    <Link className="nav-link" to={item.to} style={isActive(history, item.to)}>
      {item.name}
      {item.isCart && (
        <sup>
          <small className="cart-badge">{itemTotal()}</small>
        </sup>
      )}
    </Link>
  );

  const isLink = item => {
    const {
      isSign,
      isUserDashboard,
      isAdminDashboard,
      isHome,
      isShop,
      isCart
    } = item;
    if (
      (isSign && !isAuthenticate()) ||
      (isUserDashboard &&
        isAuthenticate() &&
        isAuthenticate().user.role === 0) ||
      (isAdminDashboard &&
        isAuthenticate() &&
        isAuthenticate().user.role === 1) ||
      isHome ||
      isShop ||
      isCart
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
