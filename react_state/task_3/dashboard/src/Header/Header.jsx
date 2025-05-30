import React from 'react';
import holbertonLogo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import newContext from '../Context/context';

class Header extends React.Component {
    static contextType = newContext;
    render() {
        const { user, logOut } = this.context;
        return (
        <>
        <div className={css(styles.headerstyle)}>
            <img src={holbertonLogo} className={css(styles.headerimg)} alt="holberton logo" />
            <h1 className={css(styles.title)}>School dashboard</h1>
        </div>
        {user.isLoggedIn && (
            <section id='logoutSection'>
                Welcome {user.email} (
                    <a href='#' onClick={logOut}><i>logout</i></a>
                )
            </section>
        )}
        </>
        )
    }
}

const styles = StyleSheet.create({
    headerstyle: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottomStyle: 'solid',
        borderColor: '#e1003c',
    },
    title: {
        display: 'flex',
        fontWeight: 'bold',
        color: '#e1003c',
    },
    headerimg: {
        display: 'flex',
        width: '150px'
    },
})

export default Header
