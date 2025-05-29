import React from 'react';
import { getFooterCopy, getFullYear } from '../utils/utils';
import { StyleSheet, css } from 'aphrodite';
import AppContext from '../Context/context';

function Footer() {
  return (
    <AppContext.Consumer>
      {({ user }) => (
        <div className={css(styles.footer)}>
          <p className={css(styles.p)}>
            Copyright {getFullYear()} - {getFooterCopy()}
          </p>
          {user.isLoggedIn && (
            <p className={css(styles.p)}>
              <a href="#">Contact us</a>
            </p>
          )}
        </div>
      )}
    </AppContext.Consumer>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    borderTop: '3px solid var(--holberton-red)',
  },
  p: {
    textAlign: 'center',
    padding: '16px 0',
  },
});

export default Footer;
