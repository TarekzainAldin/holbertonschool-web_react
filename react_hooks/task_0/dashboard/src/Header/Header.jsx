import { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from 'aphrodite';
import { newContext } from '../Context/context';

function Header() {
  const { user, logOut } = useContext(newContext);

  return (
    <div className={css(styles.header)}>
      <img src={logo} alt="holberton logo" className={css(styles.logo)} />
      <h1 className={css(styles.title)}>School dashboard</h1>
      {user?.isLoggedIn && (
        <section id="logoutSection" className={css(styles.logout)}>
          Welcome {user.email}{' '}
          <a href="#" onClick={logOut}>
            logout
          </a>
        </section>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '3px solid #e1003c',
    position: 'relative',
  },
  logo: {
    height: '200px',
  },
  title: {
    color: '#e1003c',
    marginLeft: '1rem',
  },
  logout: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '1rem',
  },
});

export default Header;
