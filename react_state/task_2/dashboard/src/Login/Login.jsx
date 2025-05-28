import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email || '',
      password: props.password || '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  // Validate email and password
  validateForm(email, password) {
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= 8;
    return isValidEmail && isValidPassword;
  }

  // Handle form submission
  handleLoginSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  }

  // Handle email change
  handleChangeEmail(event) {
    const email = event.target.value;
    const { password } = this.state;
    this.setState({
      email,
      enableSubmit: this.validateForm(email, password),
    });
  }

  // Handle password change
  handleChangePassword(event) {
    const password = event.target.value;
    const { email } = this.state;
    this.setState({
      password,
      enableSubmit: this.validateForm(email, password),
    });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.bodystyle)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">
            Email:
            <input
              className={css(styles.bodyinput)}
              id="email"
              type="email"
              value={email}
              onChange={this.handleChangeEmail}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              className={css(styles.bodyinput)}
              id="password"
              type="password"
              value={password}
              onChange={this.handleChangePassword}
            />
          </label>
          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
            className={css(styles.submitButton)}
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
};

Login.defaultProps = {
  email: '',
  password: '',
};

const styles = StyleSheet.create({
  bodystyle: {
    display: 'block',
    padding: '0.5rem',
  },
  bodyinput: {
    margin: '0 0.5rem',
  },
  submitButton: {
    marginTop: '1rem',
    cursor: 'pointer',
  },
});

export default Login;
