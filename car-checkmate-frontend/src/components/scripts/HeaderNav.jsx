import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../pages/styles/main.css';
import '../styles/header.css';
import ForgotPasswordPopup from '../../components/scripts/ForgotPasswordPopup';
import SignInPopup from '../../components/scripts/SignInPopup';
import SignUpPopup from '../../components/scripts/SignUpPopup';

export default function HeaderNav() {

    const [showForgotPassPopup, setShowForgotPassPopup] = useState(false);
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);

    const openForgotPassPopup = () => {
        setShowSignInPopup(false); // Close sign in popup
        setShowSignUpPopup(false); // Close sign up popup
        setShowForgotPassPopup(true); // Open forgot password popup
    };

    const openSignInPopup = () => {
        setShowForgotPassPopup(false); // Close forgot password popup
        setShowSignUpPopup(false); // Close sign up popup
        setShowSignInPopup(true); // Open sign in popup
    };

    const openSignUpPopup = () => {
        setShowForgotPassPopup(false); // Close forgot password popup
        setShowSignInPopup(false); // Close sign in popup
        setShowSignUpPopup(true); // Open sign up popup
    };

    return (
        <div className='ctr-main-header'>

            <ForgotPasswordPopup
                showForgotPassPopup={showForgotPassPopup} 
                setShowForgotPassPopup={setShowForgotPassPopup}
            />
                
            <SignInPopup 
                showSignInPopup={showSignInPopup}
                setShowSignInPopup={setShowSignInPopup}
                openForgotPassPopup={openForgotPassPopup} 
                openSignUpPopup={openSignUpPopup}
            />
                
            <SignUpPopup
                showSignUpPopup={showSignUpPopup}
                setShowSignUpPopup={setShowSignUpPopup}
                openSignInPopup={openSignInPopup}
            />

            <div className='ctr-main-header-logo'>
                <NavLink to="/Homepage">
                    <img src="images/logo_darkBrown_cut.png" alt="Logo" />
                </NavLink>
                <h2>CarCheckMate</h2>
            </div>
            <div className='ctr-main-header-nav'>
                <NavLink to="/ListingPage" activeClassName="active">Buy</NavLink>
                <NavLink to="/listing" activeClassName="active">Sell</NavLink>
                <NavLink to="/carinfo" activeClassName="active">About Us</NavLink>
            </div>
            <div className='ctr-main-header-login'>
                <button onClick={openSignInPopup}>Login</button>
            </div>
        </div>
    );
}
