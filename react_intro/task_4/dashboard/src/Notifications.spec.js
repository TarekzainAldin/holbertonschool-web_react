import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';

describe('Notifications component', () => {

  // 1. اختبار وجود العنوان "Here is the list of notifications"
  test('should display the notifications title', () => {
    render(<Notifications />);
    const titleElement = screen.getByText(/Here is the list of notifications/i); // نبحث عن النص مع تجاهل حالة الأحرف
    expect(titleElement).toBeInTheDocument(); // نتأكد أنه موجود في الـ DOM
  });

  // 2. اختبار وجود الزر (button element)
  test('should have a close button', () => {
    render(<Notifications />);
    const buttonElement = screen.getByRole('button', { name: /close/i }); // ابحث عن الزر باستخدام aria-label
    expect(buttonElement).toBeInTheDocument(); // تأكد من وجود الزر
  });

  // 3. اختبار وجود 3 عناصر li
  test('should render 3 list items', () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole('listitem'); // ابحث عن العناصر li
    expect(listItems.length).toBe(3); // تحقق من وجود 3 عناصر
  });

  // 4. اختبار الضغط على الزر
  test('should log "Close button has been clicked" when close button is clicked', () => {
    // ننشئ دالة وهمية لمراقبة الكونسول
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<Notifications />);
    const buttonElement = screen.getByRole('button', { name: /close/i }); // نبحث عن الزر باستخدام aria-label
    fireEvent.click(buttonElement); // نحاكي ضغط الزر

    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked'); // نتأكد أن الرسالة تم تسجيلها في الكونسول

    consoleSpy.mockRestore(); // استعادة الكونسول بعد الاختبار
  });

});
