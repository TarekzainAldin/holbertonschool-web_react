import React from 'react';

// Define default user object with required properties
const user = {
  email: '',
  password: '',
  isLoggedIn: false
};

// Define default logOut function as an empty function
const logOut = () => {};

// Create and export a new React context with default values
export const newContext = React.createContext({
  user,
  logOut
});
