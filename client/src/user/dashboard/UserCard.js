import React from "react";
import { isAuthenticate } from "../../auth/auth";

const UserCard = ({ text, isInfo }) => {
  const {
    user: { _id, name, mail, role }
  } = isAuthenticate();
  const listInfo = [
    {
      name
    },
    {
      name: mail
    },
    {
      name: role === 1 ? "Admin" : "Registered User"
    }
  ];

  const listHistory = [
    {
      name: "History"
    }
  ];
  const listMap = list =>
    list.map((item, idx) => (
      <li className="list-group-item" key={idx}>
        {item.name}
      </li>
    ));
    
  return (
    <div className="card mb-5">
      <h3 className="card-header">{text}</h3>
      <ul className="list-group">{listMap(isInfo ? listInfo : listHistory)}</ul>
    </div>
  );
};

export default UserCard;
