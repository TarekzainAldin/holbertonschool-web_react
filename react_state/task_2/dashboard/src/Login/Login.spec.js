import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('calls logIn with email and password when form is submitted', () => {
    const mockLogIn = jest.fn();

    render(<Login logIn={mockLogIn} email="" password="" />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByDisplayValue('OK');

    // زر الإرسال معطل في البداية
    expect(submitButton).toBeDisabled();

    // أدخل بريد إلكتروني صالح وكلمة مرور >= 8 أحرف
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });

    // بعد الإدخال الصحيح، يجب أن يكون الزر مفعل
    expect(submitButton).toBeEnabled();

    // إرسال الفورم
    fireEvent.click(submitButton);

    // تحقق أن الدالة logIn تم استدعاؤها مرة واحدة بالقيم الصحيحة
    expect(mockLogIn).toHaveBeenCalledTimes(1);
    expect(mockLogIn).toHaveBeenCalledWith('user@example.com', 'mypassword');
  });
});
