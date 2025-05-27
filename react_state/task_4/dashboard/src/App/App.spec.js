import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('removes a notification and logs it', () => {
  console.log = jest.fn();
  const wrapper = shallow(<App />);
  
  // تأكد من أن هناك إشعارًا
  wrapper.setState({
    notifications: [
      { id: 1, type: 'default', value: 'Test notification' },
    ]
  });

  // استدعاء دالة الحذف
  wrapper.instance().markNotificationAsRead(1);

  // تحقق من الحذف
  expect(wrapper.state('notifications')).toEqual([]);
  expect(console.log).toHaveBeenCalledWith('Notification 1 has been marked as read');
});
