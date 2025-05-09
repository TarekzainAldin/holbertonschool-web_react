// NotificationItem.spec.js
import React from 'react';
// استيراد أدوات الاختبار من مكتبة React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  it('يستدعي دالة markAsRead بالمعرف الصحيح عند الضغط', () => {
    // إنشاء دالة وهمية لتتبع استدعاء markAsRead
    const mockMarkAsRead = jest.fn();

    // عرض المكون في بيئة الاختبار مع تمرير الخصائص
    render(
      <NotificationItem
        id={5}
        type="default"
        value="Test notification"
        markAsRead={mockMarkAsRead}
      />
    );

    // إيجاد عنصر <li> اللي يحتوي على النص
    const listItem = screen.getByText('Test notification');

    // محاكاة الضغط على العنصر
    fireEvent.click(listItem);

    // التحقق من أن الدالة استُدعيت بالمعرّف الصحيح
    expect(mockMarkAsRead).toHaveBeenCalledWith(5);
  });
});
