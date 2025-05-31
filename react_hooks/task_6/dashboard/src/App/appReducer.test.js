import { appReducer, initialState, APP_ACTIONS } from "./appReducer";

describe("appReducer", () => {
  it("should handle LOGIN", () => {
    const action = {
      type: APP_ACTIONS.LOGIN,
      payload: { email: "test@example.com", password: "12345678" },
    };
    const newState = appReducer(initialState, action);
    expect(newState.user.isLoggedIn).toBe(true);
    expect(newState.user.email).toBe("test@example.com");
  });

  it("should handle LOGOUT", () => {
    const state = {
      ...initialState,
      user: { email: "a", password: "b", isLoggedIn: true },
    };
    const newState = appReducer(state, { type: APP_ACTIONS.LOGOUT });
    expect(newState.user.isLoggedIn).toBe(false);
  });

  it("should toggle drawer visibility", () => {
    const state = { ...initialState, displayDrawer: true };
    const newState = appReducer(state, { type: APP_ACTIONS.TOGGLE_DRAWER });
    expect(newState.displayDrawer).toBe(false);
  });

  it("should set notifications", () => {
    const notifs = [{ id: 1, value: "New" }];
    const action = {
      type: APP_ACTIONS.SET_NOTIFICATIONS,
      payload: { notifications: notifs },
    };
    const newState = appReducer(initialState, action);
    expect(newState.notifications).toEqual(notifs);
  });
});
