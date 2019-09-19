import React, { useState } from "react";

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = id => () => {
    const currentCategoryId = checked.indexOf(id);
    const newCheckedCategoryId = [...checked];
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(id);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    handleFilters(newCheckedCategoryId, "category");
    setChecked(newCheckedCategoryId);
  };
  return categories.map((item, idx) => (
    <li className="list-unstyled" key={idx}>
      <input
        onChange={handleToggle(item._id)}
        value={checked.indexOf(item._id === -1)}
        type="checkbox"
        className="form-check-input"
      />
      <label className="form-check-label">{item.name}</label>
    </li>
  ));
};

export default Checkbox;
