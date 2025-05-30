import React from 'react'
import WithLogging from '../HOC/WithLogging'
import { StyleSheet, css } from 'aphrodite';
import App from '../App/App';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            email: '',
            password: '',
            enableSubmit: false,
        }
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    handleLoginSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.logIn(email, password);
    }

    handleChangeEmail = (event) => {
        const email = event.target.value;
        const { password } = this.state;
        const enableSubmit = this.validateForm(email, password);
        this.setState({ email, enableSubmit });
  };

    handleChangePassword = (event) => {
        const password = event.target.value;
        const { email } = this.state;
        const enableSubmit = this.validateForm(email, password);
        this.setState({ password, enableSubmit });
  };

    validateForm = (email, password) => {
        const isValidEmail = /\S+@\S+\.\S+/.test(email);
        const isValidPassword = password.length >= 8;
        return email !== '' && password !== '' && isValidEmail && isValidPassword;
    };

    render() {
        const { email, password, enableSubmit } = this.state;

        return (
        <div className={css(styles.bodystyle)}>
            <p>Login to access the full dashboard</p>
            <form onSubmit={this.handleLoginSubmit}>
                <label htmlFor="email">Email:
                    <input className={css(styles.bodyinput)} id="email" type="email" value={email} onChange={this.handleChangeEmail} />
                </label>
                <label htmlFor="password">Password:
                    <input className={css(styles.bodyinput)} id="password" type="password" value={password} onChange={this.handleChangePassword} />
                </label>
                <input className={styles.button} type='submit' value='OK' disabled={!enableSubmit}/>
            </form>
        </div>
        )
    }
}

const styles = StyleSheet.create({
    bodystyle: {
        display: 'block',
        justifyContent: 'flex-start',
        padding: '0.5rem',
        flex: '1',
        '@media (max-width: 900px)': {
            display:' flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
    },
    bodyinput: {
        margin: '0 0.5rem 0',
        '@media (max-width: 900px)': {
            border: 'none',
            outline: 'none',
        }
    },
    button: {
        marginTop: '1rem',
        display: 'inline-block',
        width: 'auto',
        '@media (max-width: 900px)': {
            width: 'fit-content',
        },
    },
})

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
