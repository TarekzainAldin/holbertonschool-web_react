import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import useLogin from '../../hooks/useLogin';

export default function Login() {
  const dispatch = useDispatch();

  // دالة تسجيل الدخول التي تُرسل البيانات إلى الـ Redux store
  const onLogin = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  // استخدام hook لإدارة الحالة والتحقق من صحة البيانات
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    isValid,
  } = useLogin(onLogin);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <button type="submit" disabled={!isValid}>
        Login
      </button>
    </form>
  );
}
