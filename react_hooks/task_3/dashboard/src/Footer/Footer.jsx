import { useContext } from 'react';
import { getCurrentYear, getFooterCopy } from '../utils/utils';
import { newContext } from '../Context/context';
import { StyleSheet, css } from 'aphrodite';

function Footer() {
  const { user } = useContext(newContext);

  return (
    <div className={css(styles.footer)}>
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
      {user?.isLoggedIn && (
        <p>
          <a href="#">Contact us</a>
        </p>
      )}
    </div>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderTop: '3px solid #e1003c',
    textAlign: 'center',
    padding: '1rem 0',
  },
});

export default Footer;
