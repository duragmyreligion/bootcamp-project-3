import React, { useState } from 'react';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  function toggleMobileMenu() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  // Function to close the mobile menu
  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  // Function to show navigation items based on user authentication
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className={`flex-row menu-items ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <li className="mt-3 ml-1 mr-3">
            <Link to="/orderHistory" className="order-history" style={{ textDecoration: 'none' }}>
              Order History
            </Link>
          </li>
          <li className="mx-1 mt-3 logout">
            <a href="/" className="logout" style={{ textDecoration: 'none' }} onClick={() => Auth.logout()}>
              Log Out
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className={`flex-row menu-items ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <li className="mx-1 ml-1 mr-4 mt-4 login">
            <Link to="/signup" className="signup" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </li>
          <li className="mx-1 mt-4">
            <Link to="/login" className="login" style={{ textDecoration: 'none' }}>
              Log In
            </Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row px-1">
      <div className="left-content">
        <img className="logo ml-3 mt-2" src="./images/nwg_logo.png" alt="New World Gear Logo" />
      </div>

      <div className="mx-auto mt-1">
        <Link to="/" className="logoName" style={{ textDecoration: 'none' }}>
          <img src="./images/nwg.png" alt="New World Gear" />
        </Link>
      </div>

      {/* Hamburger menu icon */}
      <button className="hamburger-menu" onClick={toggleMobileMenu}>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
        <span className="menu-icon"></span>
      </button>

      {/* Navigation menu */}
      <nav className={`right-content ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} onClick={closeMobileMenu}>
        {showNavigation()}
      </nav>
    </header>
  );
}

export default Nav;
