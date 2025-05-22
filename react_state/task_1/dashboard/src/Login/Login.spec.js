import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('<Login />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('Submit button is disabled by default', () => {
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('Submit button becomes enabled with valid inputs', () => {
    wrapper.find('#email').simulate('change', {
      target: { value: 'test@example.com' }
    });
    wrapper.find('#password').simulate('change', {
      target: { value: 'password123' }
    });

    // re-evaluate the submit button's enabled state
    wrapper.update();

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('Submit button stays disabled for invalid email', () => {
    wrapper.find('#email').simulate('change', {
      target: { value: 'invalid-email' }
    });
    wrapper.find('#password').simulate('change', {
      target: { value: 'password123' }
    });

    wrapper.update();

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });

  it('Submit button stays disabled for short password', () => {
    wrapper.find('#email').simulate('change', {
      target: { value: 'test@example.com' }
    });
    wrapper.find('#password').simulate('change', {
      target: { value: 'short' }
    });

    wrapper.update();

    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(true);
  });
});
