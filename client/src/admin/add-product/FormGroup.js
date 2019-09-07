import React from "react";
import { formGroupsList } from "./formGroupList";

const FormGroup = ({
  handleChange,
  description,
  price,
  category,
  quantity,
  name,
  categories
}) => {
  const formGroup = () =>
    formGroupsList({
      handleChange,
      description,
      price,
      category,
      quantity,
      name
    }).map((item, idx) => {
      if (item.isTextArea) {
        return (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.labelName}</label>
            <textarea
              className="form-control"
              value={item.value}
              onChange={item.change}
            />
          </div>
        );
      } else if (item.isSelect) {
        return (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.labelName}</label>
            <select className="form-control" onChange={item.change}>
              {item.isShipping ? (
                <React.Fragment>
                  <option>Please select shipping</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <option>Please Select Category</option>
                  {categories &&
                    categories.map((category, idx) => (
                      <option key={idx} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </React.Fragment>
              )}
            </select>
          </div>
        );
      } else {
        return (
          <div className="form-group" key={idx}>
            <label className="text-muted">{item.labelName}</label>
            <input
              className="form-control"
              type={item.type}
              value={item.value}
              onChange={item.change}
            />
          </div>
        );
      }
    });
  return formGroup();
};

export default FormGroup;
