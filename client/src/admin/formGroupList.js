export const formGroupsList = ({
  handleChange,
  description,
  price,
  category,
  quantity,
  name
}) => [
  {
    labelName: "Name",
    value: name,
    change: handleChange("name"),
    type: "text"
  },
  {
    labelName: "Description",
    value: description,
    change: handleChange("description"),
    isTextArea: true
  },
  {
    labelName: "Price",
    value: price,
    change: handleChange("price"),
    type: "number"
  },
  {
    labelName: "Category",
    value: category,
    isSelect: true,
    change: handleChange("cateory")
  },
  {
    labelName: "Shipping",
    value: quantity,
    change: handleChange("shipping"),
    isSelect: true,
    isShipping: true
  },
  {
    labelName: "Quantity",
    value: quantity,
    change: handleChange("quantity"),
    type: "number"
  }
];
