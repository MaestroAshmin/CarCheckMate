import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

export default function NavBar() {
  const [isLoggedIn] = useState(false);
  const menu = ["Profile", "Setting", "Logout"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function notSigned() {
    return (
      <div className='log--in'>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
      </div>
    );
  }

  function Signed() {
    return (
      <div className="signed">
        <p onClick={() => setIsMenuOpen(!isMenuOpen)}>Raihan Momtaz</p>
        {isMenuOpen && (
          <div className='menu'>
            <ul>
              {menu.map((menuItem) => (
                <li key={menuItem}>{menuItem}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className='nav--container'>
      <img className='logo' src="logo.png" alt="Logo" />
      <div className="nav-links">
        <Link to="/">Home</Link> |
        <Link to="/listing">Listing</Link> | 
        <Link to="/carinfo">About</Link>
      </div>
      {isLoggedIn ? notSigned() : Signed()}
    </div>
  );
}