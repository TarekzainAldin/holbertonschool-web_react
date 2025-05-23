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
    wrapper.find('#email').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('#password').simulate('change', { target: { value: 'password123' } });

    wrapper.update();
    expect(wrapper.find('input[type="submit"]').prop('disabled')).toBe(false);
  });

  it('Calls logIn with correct credentials on submit', () => {
    wrapper.find('#email').simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('#password').simulate('change', { target: { value: 'password123' } });
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
