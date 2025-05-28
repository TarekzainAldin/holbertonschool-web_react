import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login Component', () => {
  it('calls logIn prop with email and password on submit', () => {
    const mockLogIn = jest.fn();
    const wrapper = shallow(<Login logIn={mockLogIn} email="" password="" />);
    
    // تحديث الحقول ليتمكن من تفعيل الزر
    wrapper.find('#email').simulate('change', { target: { value: 'user@test.com' } });
    wrapper.find('#password').simulate('change', { target: { value: 'password123' } });

    // تفعيل ال submit
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });

    expect(mockLogIn).toHaveBeenCalledWith('user@test.com', 'password123');
  });
});
