// task_2/dashboard/src/Login/Login.spec.js
import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('calls logIn prop function with email and password on form submit', () => {
    const logInMock = jest.fn();
    const wrapper = shallow(<Login logIn={logInMock} />);

    // Simulate entering valid email and password
    wrapper.find('input#email').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('input#password').simulate('change', { target: { value: 'password123' } });

    // Simulate form submit
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(logInMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
