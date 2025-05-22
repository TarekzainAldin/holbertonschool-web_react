import React from "react";
import { StyleSheet, css } from "aphrodite";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      enableSubmit: false,
      isLoggedIn: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  validateForm(email, password) {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 8;
    return emailValid && passwordValid;
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    const { password } = this.state;
    this.setState({
      email,
      enableSubmit: this.validateForm(email, password),
    });
  }

  handleChangePassword(event) {
    const password = event.target.value;
    const { email } = this.state;
    this.setState({
      password,
      enableSubmit: this.validateForm(email, password),
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <div className={css(styles.body)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              className={css(styles.input)}
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className={css(styles.input)}
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className={css(styles.buttonWrapper)}>
            <input
              type="submit"
              value="OK"
              className={css(styles.button)}
              disabled={!this.state.enableSubmit}
            />
          </div>
        </form>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: "30px",
    "@media (max-width: 900px)": {
      padding: "20px",
    },
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1em",
    "@media (max-width: 900px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  input: {
    marginLeft: "10px",
    "@media (max-width: 900px)": {
      marginLeft: "0",
      marginTop: "5px",
      width: "100%",
    },
  },
  buttonWrapper: {
    "@media (max-width: 900px)": {
      display: "flex",
      justifyContent: "flex-start",
    },
  },
  button: {
    marginLeft: "10px",
    "@media (max-width: 900px)": {
      marginLeft: "0",
    },
  },
});

export default Login;
