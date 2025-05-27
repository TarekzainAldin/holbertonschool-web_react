import React from 'react';
import { shallow } from 'enzyme';
import Notifications from './Notifications';

it('calls markNotificationAsRead when clicking a notification', () => {
  const mockFn = jest.fn();
  const notifications = [
    { id: 1, type: 'default', value: 'Test notification' }
  ];

  const wrapper = shallow(
    <Notifications
      displayDrawer={true}
      notifications={notifications}
      markNotificationAsRead={mockFn}
    />
  );

  wrapper.find('NotificationItem').at(0).simulate('click');
  expect(mockFn).toHaveBeenCalledWith(1);
});
