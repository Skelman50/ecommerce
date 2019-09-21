export const inputList = (name, email, password) => {
  return [
    {
      value: name,
      type: "name",
      name: "Name"
    },
    {
      value: email,
      type: "email",
      name: "Email"
    },
    {
      value: password,
      type: "password",
      name: "Password"
    }
  ];
};
