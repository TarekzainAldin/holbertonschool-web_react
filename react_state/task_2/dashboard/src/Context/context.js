import React from "react";

const defaultUser = {
  email: "",
  password: "",
  isLoggedIn: false,
};

const AppContext = React.createContext({
  user: defaultUser,
  logOut: () => {},
});

export default AppContext;
