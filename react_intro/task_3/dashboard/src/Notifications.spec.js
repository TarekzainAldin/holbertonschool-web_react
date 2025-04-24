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
    const buttonElement = screen.getByRole('button', { name: /Close/i }); // نبحث عن الزر باستخدام role والـ aria-label
    expect(buttonElement).toBeInTheDocument(); // نتأكد من وجود الزر
  });

  // 3. اختبار وجود 3 عناصر li
  test('should render 3 list items', () => {
    render(<Notifications />);
    const listItems = screen.getAllByRole('listitem'); // نبحث عن جميع العناصر من النوع li
    expect(listItems).toHaveLength(3); // نتأكد أن عدد العناصر هو 3
  });

  // 4. اختبار الضغط على الزر
  test('should log "Close button has been clicked" when close button is clicked', () => {
    // ننشئ دالة وهمية لمراقبة الكونسول
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<Notifications />);
    const buttonElement = screen.getByRole('button', { name: /Close/i }); // نبحث عن الزر
    fireEvent.click(buttonElement); // نحاكي ضغط الزر

    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked'); // نتأكد أن الرسالة تم تسجيلها في الكونسول

    consoleSpy.mockRestore(); // استعادة الكونسول بعد الاختبار
  });

});
