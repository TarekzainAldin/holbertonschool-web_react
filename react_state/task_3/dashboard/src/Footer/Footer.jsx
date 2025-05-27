import React, { useContext } from 'react';
import { getFullYear, getFooterCopy } from '../utils/utils';
import AppContext from '../App/AppContext';

function Footer({ isIndex }) {
  const { user } = useContext(AppContext);

  return (
    <footer>
      <p>
        Copyright {getFullYear()} - {getFooterCopy(isIndex)}
      </p>
      {user.isLoggedIn && (
        <p>
          <a href="/contact">Contact us</a>
        </p>
      )}
    </footer>
  );
}

export default Footer;
