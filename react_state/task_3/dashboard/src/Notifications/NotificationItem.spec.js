import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

describe('NotificationItem Component', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<NotificationItem type="default" value="test" />);
  });

  it('renders correct HTML with type and value props', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    const li = wrapper.find('li');
    expect(li.prop('data-notification-type')).toEqual('default');
    expect(li.text()).toEqual('test');
  });

  it('renders correct HTML with html prop', () => {
    const htmlProp = { __html: '<p>test</p>' };
    const wrapper = shallow(<NotificationItem html={htmlProp} />);
    expect(wrapper.find('li').prop('dangerouslySetInnerHTML')).toEqual(htmlProp);
  });

  describe('<NotificationItem /> interaction', () => {
    it('calls markAsRead with the correct ID when clicked', () => {
      const markAsReadSpy = jest.fn();
      const wrapper = shallow(
        <NotificationItem
          type="default"
          value="Test notification"
          markAsRead={markAsReadSpy}
          id={1}
        />
      );

      // Simulate click event
      wrapper.find('li').simulate('click');

      // Check if markAsRead was called with the correct ID
      expect(markAsReadSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Style Tests', () => {
    it('applies the correct style for "default" type', () => {
      const wrapper = shallow(<NotificationItem type="default" value="Test" />);
      const li = wrapper.find('li');
      expect(li.prop('className')).toContain('default'); // Vérifie si className contient 'default'
      expect(li.prop('className')).not.toContain('urgent'); // Vérifie qu'il n'y a pas 'urgent'
    });

    it('applies the correct style for "urgent" type', () => {
      const wrapper = shallow(<NotificationItem type="urgent" value="Test" />);
      const li = wrapper.find('li');
      expect(li.prop('className')).toContain('urgent'); // Vérifie si className contient 'urgent'
      expect(li.prop('className')).not.toContain('default'); // Vérifie qu'il n'y a pas 'default'
    });
  });
});
