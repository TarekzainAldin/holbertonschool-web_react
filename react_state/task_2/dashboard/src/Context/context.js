import React from 'react';

// الكائن الافتراضي للمستخدم
export const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

// دالة تسجيل خروج فارغة افتراضية
export const defaultLogOut = () => {};

// إنشاء الـ Context مع القيمة الافتراضية
const newContext = React.createContext({
  user: defaultUser,
  logOut: defaultLogOut,
});

export default newContext;
