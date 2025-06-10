import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    password: '',
  },
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log('[authSlice] login reducer called with payload:', action.payload);
      console.log('Login action dispatched with payload:', action.payload);
      const { email, password } = action.payload;
      state.user.email = email;
      state.user.password = password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      console.log('Logout action dispatched');
      state.user.email = '';
      state.user.password = '';
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
