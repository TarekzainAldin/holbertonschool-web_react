import { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

function Login({ logIn }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const isValidPassword = (password) => password.length >= 8;

  useEffect(() => {
    const { email, password } = formData;
    const canSubmit =
      email !== '' &&
      password !== '' &&
      isValidEmail(email) &&
      isValidPassword(password);
    setEnableSubmit(canSubmit);
  }, [formData]);

  const handleChangeEmail = (e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleChangePassword = (e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    logIn(formData.email, formData.password);
  };

  return (
    <div className={css(styles.login)}>
      <p>Login to access the full dashboard</p>
      <form onSubmit={handleLoginSubmit}>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          className={css(styles.input)}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          className={css(styles.input)}
          onChange={handleChangePassword}
        />
        <input
          type="submit"
          value="OK"
          className={css(styles.button)}
          disabled={!enableSubmit}
        />
      </form>
    </div>
  );
}

Login.defaultProps = {
  logIn: () => {},
};

const styles = StyleSheet.create({
  login: {
    padding: '40px',
    minHeight: '300px',
    '@media (max-width: 900px)': {
      display: 'block',
      padding: '10px',
    },
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    marginTop: '5px',
  },
  button: {
    display: 'block',
    marginTop: '10px',
  },
});

export default Login;
