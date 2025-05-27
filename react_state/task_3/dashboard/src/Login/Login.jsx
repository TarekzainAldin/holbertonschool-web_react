import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enableSubmit: false,
    };
  }

  handleChangeEmail = (e) => {
    const email = e.target.value;
    this.setState({ email }, this.validateForm);
  };

  handleChangePassword = (e) => {
    const password = e.target.value;
    this.setState({ password }, this.validateForm);
  };

  validateForm = () => {
    const { email, password } = this.state;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validPassword = password.length >= 8;
    this.setState({ enableSubmit: validEmail && validPassword });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.logIn(email, password);
  };

  render() {
    const { enableSubmit, email, password } = this.state;

    return (
      <div className={css(styles.login)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChangeEmail}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={this.handleChangePassword}
          />

          <input
            type="submit"
            value="OK"
            disabled={!enableSubmit}
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func,
};

Login.defaultProps = {
  logIn: () => {},
};

const styles = StyleSheet.create({
  login: {
    margin: '2rem',
  },
});

export default Login;
