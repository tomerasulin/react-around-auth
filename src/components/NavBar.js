import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = ({ isLoggedIn, onLogout, emailUser }) => {
  const location = useLocation();

  return isLoggedIn ? (
    <nav className='menu'>
      <span className='menu__email'>{emailUser}</span>
      <Link className='menu__item' to={'/signin'} onClick={onLogout}>
        {'Log out'}
      </Link>
    </nav>
  ) : (
    <nav className='menu'>
      <Link
        className='menu__item'
        to={location.pathname === '/signin' ? '/signup' : '/signin'}
      >
        {location.pathname === '/signin' ? 'Sign up' : 'Log in'}
      </Link>
    </nav>
  );
};

export default NavBar;
