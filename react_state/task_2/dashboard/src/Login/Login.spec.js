import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  let wrapper;
  const mockLogIn = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Login logIn={mockLogIn} />);
  });

  it('Submit button is disabled by default', () => {
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('Submit button becomes enabled with valid inputs', () => {
    wrapper.find('#email').simulate('change', {
      target: { value: 'test@example.com' },
    });
    wrapper.find('#password').simulate('change', {
      target: { value: 'password123' },
    });

    wrapper.update();

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('Submit button stays disabled for invalid email', () => {
    wrapper.find('#email').simulate('change', {
      target: { value: 'invalid-email' },
    });
    wrapper.find('#password').simulate('change', {
      target: { value: 'password123' },
    });

    wrapper.update();

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('Submit button stays disabled for short password', () => {
    wrapper.find('#email').simulate('change', {
      target: { value: 'test@example.com' },
    });
    wrapper.find('#password').simulate('change', {
      target: { value: 'short' },
    });

    wrapper.update();

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('Calls logIn with email and password on submit', () => {
    const email = 'test@example.com';
    const password = 'password123';

    wrapper.find('#email').simulate('change', { target: { value: email } });
    wrapper.find('#password').simulate('change', { target: { value: password } });

    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(mockLogIn).toHaveBeenCalledWith(email, password);
  });
});
