import React from 'react'
import WithLogging from '../HOC/WithLogging'
import { StyleSheet, css } from 'aphrodite';

class Login extends React.Component {
    render() {
        return (
        <div className={css(styles.bodystyle)}>
            <p>Login to access the full dashboard</p>
            <label htmlFor="email">Email:
                <input className={css(styles.bodyinput)} id="email" type="email" />
            </label>
            <label htmlFor="password">Password:
                <input className={css(styles.bodyinput)} id="password" type="password" />
            </label>
            <button>OK</button>
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
    },
    bodyinput: {
        margin: '0 0.5rem 0',
    },
})

const LoginWithLogging = WithLogging(Login);
export default LoginWithLogging;
