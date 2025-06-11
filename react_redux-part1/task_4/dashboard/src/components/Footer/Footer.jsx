import { StyleSheet, css } from 'aphrodite';
import { getCurrentYear, getFooterCopy } from '../../utils/utils';
import { useSelector } from 'react-redux';

export default function Footer() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className={css(styles.footer)}>
      <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      {isLoggedIn ? (
        <p>
          <a href="#">Contact us</a>
        </p>
      ) : null}
    </div>
  );
}

const styles = StyleSheet.create({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
  },
});
