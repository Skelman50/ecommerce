import React from "react";
import { API } from "../config";

const ShowImage = ({ item: { _id, name }, url }) => {
  return (
    <div className="product-img">
      <img
        src={`${API}/${url}/photo/${_id}`}
        alt={name}
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      ></img>
    </div>
  );
};

export default ShowImage;
