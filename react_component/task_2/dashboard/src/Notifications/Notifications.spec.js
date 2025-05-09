// NotificationItem.spec.js
import React from 'react';
// استيراد أدوات الاختبار من مكتبة Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
// استيراد المكون المراد اختباره
import NotificationItem from './NotificationItem';

describe('NotificationItem Component', () => {
  // اختبار يتحقق من أن الدالة markAsRead تُستدعى عند الضغط
  it('calls markAsRead when clicked', () => {
    // إنشاء دالة وهمية لتتبع إذا تم استدعاؤها
    const mockMarkAsRead = jest.fn();

    // عرض المكون وتمرير الخصائص المطلوبة
    render(
      <NotificationItem
        id={5} // رقم التعريف الخاص بالإشعار
        type="default"
        value="Test notification" // النص الظاهر في li
        markAsRead={mockMarkAsRead} // تمرير الدالة الوهمية
      />
    );

    // الحصول على عنصر li باستخدام النص الظاهر
    const listItem = screen.getByText('Test notification');
    // محاكاة النقر على العنصر
    fireEvent.click(listItem);

    // التأكد أن الدالة markAsRead تم استدعاؤها بالـ id الصحيح
    expect(mockMarkAsRead).toHaveBeenCalledWith(5);
  });
});
