import React from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const handleChange = event => {
    handleFilters(event.target.value, "price");
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
