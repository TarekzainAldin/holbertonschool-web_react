// task_2/dashboard/src/Context/context.js
import React from 'react';

export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

export const defaultLogOut = () => {};

const newContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default newContext;
