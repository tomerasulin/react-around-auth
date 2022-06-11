import logo from '../images/HeaderLogo.svg';
import NavBar from './NavBar';

const Header = ({ isLoggedIn, onLogout, emailUser }) => {
  return (
    <header className='header'>
      <img className='header__image' alt='Around the U.S. logo' src={logo} />
      <NavBar
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
        emailUser={emailUser}
      />
    </header>
  );
};

export default Header;
