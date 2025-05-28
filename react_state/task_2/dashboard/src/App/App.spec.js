import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import newContext from '../Context/context';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';

describe('App Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('provides user and logOut in context', () => {
    const mounted = mount(<App />);
    const provider = mounted.find(newContext.Provider);
    expect(provider.exists()).toBe(true);

    const value = provider.prop('value');
    expect(value).toHaveProperty('user');
    expect(value).toHaveProperty('logOut');
  });

  it('renders Login component when user is NOT logged in', () => {
    wrapper.setState({ user: { email: '', password: '', isLoggedIn: false } });
    expect(wrapper.find(Login).exists()).toBe(true);
  });

  it('renders CourseList component when user IS logged in', () => {
    wrapper.setState({ user: { email: 'test@test.com', password: '12345678', isLoggedIn: true } });
    expect(wrapper.find(CourseList).exists()).toBe(true);
  });

  it('logIn method updates the user state correctly', () => {
    const instance = wrapper.instance();
    instance.logIn('user@example.com', 'password123');
    expect(wrapper.state('user')).toEqual({
      email: 'user@example.com',
      password: 'password123',
      isLoggedIn: true,
    });
  });

  it('logOut method resets the user state', () => {
    const instance = wrapper.instance();
    instance.logOut();
    expect(wrapper.state('user')).toEqual({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  });
});
