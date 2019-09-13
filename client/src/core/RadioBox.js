import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = event => {
    handleFilters(event.target.value, "price");
    setValue(event.target.value);
  };

  return prices.map((item, idx) => (
    <div key={idx}>
      <input
        onChange={handleChange}
        value={`${item._id}`}
        name={item}
        type="radio"
        className="mr-2 ml-4"
      />
      <label className="form-check-label">{item.name}</label>
    </div>
  ));
};

export default RadioBox;
