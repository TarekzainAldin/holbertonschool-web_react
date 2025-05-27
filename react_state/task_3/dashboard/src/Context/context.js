import React from "react";

// 1. تعريف المستخدم الافتراضي
export const user = {
  email: "",
  password: "",
  isLoggedIn: false,
};

// 2. تعريف دالة تسجيل الخروج الافتراضية
export const logOut = () => {};

// 3. إنشاء الـ Context وتصديره
const newContext = React.createContext({ user, logOut });

export default newContext;
