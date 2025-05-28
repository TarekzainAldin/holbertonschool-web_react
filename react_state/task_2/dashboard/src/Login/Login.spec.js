import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login component', () => {
  test('calls logIn with email and password when form is submitted', () => {
    const mockLogIn = jest.fn();

    render(<Login logIn={mockLogIn} email="" password="" />);

    // عناصر الإدخال
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /ok/i });

    // في البداية يجب أن يكون الزر معطل
    expect(submitButton).toBeDisabled();

    // أدخل بريد إلكتروني صالح
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    // أدخل كلمة مرور صالحة (>= 8 أحرف)
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // بعد الإدخال الصحيح، يجب أن يكون زر الإرسال مفعل
    expect(submitButton).toBeEnabled();

    // محاكاة إرسال الفورم
    fireEvent.click(submitButton);

    // التحقق من أن logIn تم استدعاؤها مرة واحدة مع القيم الصحيحة
    expect(mockLogIn).toHaveBeenCalledTimes(1);
    expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
