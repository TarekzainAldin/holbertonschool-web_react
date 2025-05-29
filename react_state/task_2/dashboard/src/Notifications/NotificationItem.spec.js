import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  test('renders with value prop and default type', () => {
    render(
      <NotificationItem
        type="default"
        value="Test notification"
        id={1}
        markAsRead={jest.fn()}
      />
    );

    const li = screen.getByText('Test notification');
    expect(li).toBeInTheDocument();
    expect(li).toHaveAttribute('data-notification-type', 'default');
  });

  test('renders with html prop and urgent type', () => {
    const htmlContent = { __html: '<strong>Urgent Notification</strong>' };

    render(
      <NotificationItem
        type="urgent"
        html={htmlContent}
        id={2}
        markAsRead={jest.fn()}
      />
    );

    const li = screen.getByRole('listitem');
    expect(li).toHaveAttribute('data-notification-type', 'urgent');
    expect(li.innerHTML).toBe(htmlContent.__html);
  });

  test('calls markAsRead with correct id on click', () => {
    const markAsReadMock = jest.fn();
    render(
      <NotificationItem
        type="default"
        value="click me"
        id={42}
        markAsRead={markAsReadMock}
      />
    );

    const li = screen.getByText('click me');
    fireEvent.click(li);
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
    expect(markAsReadMock).toHaveBeenCalledWith(42);
  });
});
