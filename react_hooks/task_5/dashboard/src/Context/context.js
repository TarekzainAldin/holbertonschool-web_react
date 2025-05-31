import React from "react";

const user = {
  email: "",
  password: "",
  isLoggedIn: false,
};

const defaultLogOut = () => {};

const newContext = React.createContext({
  user: user,
  logOut: defaultLogOut,
});

export { newContext };
