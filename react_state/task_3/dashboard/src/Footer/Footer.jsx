import React, { useContext } from 'react';
import AppContext from '../Context/context';

function Footer() {
  const { user } = useContext(AppContext);

  return (
    <footer>
      <p>Copyright 2023</p>
      {user.isLoggedIn && <p><a href="/contact">Contact us</a></p>}
    </footer>
  );
}

export default Footer;
