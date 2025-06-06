import authReducer, { login, logout } from '../auth/authSlice';

describe('authSlice', () => {
  const initialState = {
    user: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  };

  it('should return the initial state by default', () => {
    const state = authReducer(undefined, { type: undefined });
    expect(state).toEqual(initialState);
  });

  it('should handle login action', () => {
    const action = login({
      email: 'test@example.com',
      password: '1234'
    });

    const newState = authReducer(initialState, action);

    expect(newState.user.email).toBe('test@example.com');
    expect(newState.user.password).toBe('1234');
    expect(newState.isLoggedIn).toBe(true);
  });

  it('should handle logout action', () => {
    const loggedInState = {
      user: {
        email: 'test@example.com',
        password: '1234'
      },
      isLoggedIn: true
    };

    const newState = authReducer(loggedInState, logout());

    expect(newState).toEqual(initialState);
  });
});
