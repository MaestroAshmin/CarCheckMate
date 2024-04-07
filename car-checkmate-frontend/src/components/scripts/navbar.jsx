import React, { useState } from 'react';
import '../styles/navbar.css';

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menu = ["Profile", "Setting", "Logout"];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function notSigned() {
        return (
            <div className='log--in'>
                <ul>
                    <li><a>Login</a></li>
                    <li><a>Signup</a></li>
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
            {isLoggedIn ? notSigned() : Signed()}
        </div>
    );
}
