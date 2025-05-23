import React from "react";

const defaultUser  = {
    email:'',
    password:'',
    isLoggenIn:false
};
const defalutLogOut =() =>{};

const nexContext = React.createContext({
    user:defaultUser,
    logOut:defalutLogOut
});
export default nexContext;