// task_2/dashboard/src/Context/context.js
import React from 'react';

export const user = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const logOut = () => {};

export const newContext = React.createContext({
  user,
  logOut,
});
