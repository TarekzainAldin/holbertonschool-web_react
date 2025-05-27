import React , { useState }from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';

function Login({ logIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enableSubmit, setEnableSubmit] = useState(false);

  const handleChangeEmail = (event) => {
    const updatedEmail = event.target.value;
    setEmail(updatedEmail);
    setEnableSubmit(updatedEmail.trim() !== '' && password.trim() !== '');
  };

  const handleChangePassword = (event) => {
    const updatedPassword = event.target.value;
    setPassword(updatedPassword);
    setEnableSubmit(email.trim() !== '' && updatedPassword.trim() !== '');
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    logIn(email, password);
  };

  return (
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <form className={css(styles.form)} onSubmit={handleLoginSubmit}>
          <div className={css(styles.block)}>
            <label htmlFor="email" className={css(styles.label)}>Email:</label>
            <input className={css(styles.input)} type="email" id="email" name="email" value={email} onChange={handleChangeEmail} />
          </div>
          <div className={css(styles.block)}>
            <label htmlFor="password" className={css(styles.label)}>Password:</label>
            <input className={css(styles.input)} type="password" id="password" name="password" value={password} onChange={handleChangePassword} />
          </div>
          <input className={css(styles.button)} type="submit" value="OK"  disabled={!enableSubmit}></input>
        </form>
      </div>
  );
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  body: {
    fontSize: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  button: {
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
  },
  block: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    marginRight: '20px',
  },
  form: {
    display: 'inline-block',
    '@media (min-width: 900px)': {
      display: 'flex',
    },
  },
  label: {
    marginRight: '10px',
    fontWeight: 'bold',
  },
  input: {
    border: '1px solid #ccc',
    padding: '5px',
  },
});

export default Login;
