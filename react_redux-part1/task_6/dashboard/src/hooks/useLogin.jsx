import { useState } from 'react';

export default function useLogin({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (email, password) => {
    return validateEmail(email) && password.length >= 8;
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setFormData(prev => {
      const updated = { ...prev, email: newEmail };
      setEnableSubmit(validateForm(updated.email, updated.password));
      return updated;
    });
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setFormData(prev => {
      const updated = { ...prev, password: newPassword };
      setEnableSubmit(validateForm(updated.email, updated.password));
      return updated;
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  };

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit
  };
}
