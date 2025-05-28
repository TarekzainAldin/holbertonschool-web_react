import React from "react";
import { user } from "../../../../task_4/dashboard/src/Context/context";
const defaultUser = {
  email:"",
  password:"",
  isLoggedIn:false,
};

const logOut = () => {};

const newContext = React.createContext({
  user:defaultUser,
  logOut:logOut,
});
export default newContext;