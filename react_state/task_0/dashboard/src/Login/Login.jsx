import React from "react";
import { StyleSheet, css } from "aphrodite";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: "",
      password: "",
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault(); // يمنع إعادة تحميل الصفحة
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    const email = event.target.value;
    this.setState({ email }, this.validateForm);
  }

  handleChangePassword(event) {
    const password = event.target.value;
    this.setState({ password }, this.validateForm);
  }

  validateForm() {
    const { email, password } = this.state;
    // تعبير منتظم بسيط لفحص صحة الإيميل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 8;

    this.setState({
      enableSubmit: email !== "" && password !== "" && isEmailValid && isPasswordValid,
    });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

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
              value={email}
              onChange={this.handleChangeEmail}
            />
          </div>
          <div className={css(styles.inputGroup)}>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className={css(styles.input)}
              value={password}
              onChange={this.handleChangePassword}
            />
          </div>
          <div className={css(styles.buttonWrapper)}>
            <input
              type="submit"
              value="OK"
              className={css(styles.button)}
              disabled={!enableSubmit}
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
