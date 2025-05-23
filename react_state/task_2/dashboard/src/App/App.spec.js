import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import AppContext from '../Context/context';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });

  it('contains the Login component when not logged in', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Login).exists()).toBe(true);
    expect(wrapper.find(CourseList).exists()).toBe(false);
  });

  it('contains the CourseList component when logged in', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      user: {
        email: 'test@example.com',
        password: 'password123',
        isLoggedIn: true,
      }
    });
    expect(wrapper.find(CourseList).exists()).toBe(true);
    expect(wrapper.find(Login).exists()).toBe(false);
  });

  it('logIn updates the state with user info and sets isLoggedIn to true', () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    instance.logIn('user@example.com', 'securepass');
    expect(wrapper.state('user')).toEqual({
      email: 'user@example.com',
      password: 'securepass',
      isLoggedIn: true
    });
  });

  it('logOut resets the user to default values', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({
      user: {
        email: 'user@example.com',
        password: 'securepass',
        isLoggedIn: true
      }
    });

    const instance = wrapper.instance();
    instance.logOut();

    expect(wrapper.state('user')).toEqual({
      email: '',
      password: '',
      isLoggedIn: false
    });
  });

  it('calls logOut and shows alert when ctrl+h is pressed', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const wrapper = mount(<App />);
    const event = new KeyboardEvent('keydown', { key: 'h', ctrlKey: true });
    document.dispatchEvent(event);

    expect(alertSpy).toHaveBeenCalledWith('Logging you out');
    alertSpy.mockRestore();
    wrapper.unmount();
  });

  it('provides correct context value to children', () => {
    const wrapper = mount(<App />);
    const context = wrapper.find(AppContext.Provider).prop('value');

    expect(context.user).toEqual({
      email: '',
      password: '',
      isLoggedIn: false
    });

    expect(typeof context.logOut).toBe('function');
    wrapper.unmount();
  });
});
