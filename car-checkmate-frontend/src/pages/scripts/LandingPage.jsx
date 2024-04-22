import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import ForgotPasswordPopup from '../../components/scripts/ForgotPasswordPopup';
import SignInPopup from '../../components/scripts/SignInPopup';
import SignUpPopup from '../../components/scripts/SignUpPopup';

export default function StyleTest() {

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
        <div className='ctr-main'>

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

            <div className='ctr-sub'>
                <div className='ctr-sub-left'>
                    <img src='images/logo-cut.png' alt='Logo'/>
                    <h1 className='ctr-sub-left-font'>CarCheckMate</h1>
                    <br />
                    <br />
                    <hr />
                    <h4 className='ctr-sub-left-font'>Selling your car in Victoria is easy with our simple process</h4>
                    <h6 className='placeAtBottom-right'><a href='mailto:carcheckmate@mail.com'>carcheckmate@mail.com</a></h6>
                </div>
                <div className='ctr-sub-right'>
                    <h1 className='ctr-sub-right-font'>Delighted to<br/> welcome you!</h1>
                    <div className='ctr-btn'>
                        <Link to="/Homepage">
                            <button className='btn-login' >Continue as a guest</button>
                        </Link>
                        <button className='btn-login' onClick={openSignInPopup}>Sign In</button>  
                    </div>
                    <button className='btn-signup' onClick={openSignUpPopup}>Create a new account</button>
                    <p className='ctr-sub-right-font-p'><span>Benefits of signing up with us.</span></p>

                    <h6 className='placeAtBottom-left'>
                        {/*<span>Forgot your login?</span>&nbsp;-&nbsp;*/}
                        <span onClick={openForgotPassPopup}>Forgot your login?</span>&nbsp;-&nbsp;
                        <span>Privacy Policy</span>
                    </h6>
                </div>
            </div>
        </div>
    );
}