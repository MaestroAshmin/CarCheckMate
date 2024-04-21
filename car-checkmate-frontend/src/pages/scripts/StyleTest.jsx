//import React from 'react';
import '../styles/main.css';
//import '../styles/LandingPage.css';
import Footer from '../../components/scripts/footer';
import React, { useState } from 'react';

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
            <div className='ctr-sub'>
                <div className='ctr-sub-left'>
                    <img src='images/logo-cut.png' alt='Logo'/>
                    <h1 className='ctr-sub-left-font'>CarCheckMate</h1>
                    <br />
                    <br />
                    <hr />
                    <h4 className='ctr-sub-left-font'>Selling your car in Victoria is easy with our simple process</h4>
                    <h6 className='placeAtBottom-right'>carcheckmate@mail.com</h6>
                </div>
                <div className='ctr-sub-right'>
                    <h1 className='ctr-sub-right-font'>Delighted to<br/> welcome you!</h1>
                    <div className='ctr-btn'>
                            <button className='btn-login'>Continue as a guest</button>
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

            {showForgotPassPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowForgotPassPopup(false)}>&times;</span>
                            <h2>Forgot Your Password?</h2>
                            <p>Please enter your email address below to reset your password.</p>
                            <br />
                            <form>
                                <label htmlFor='forgotEmail'>Email:</label>
                                <input type='email' id='forgotEmail' name='forgotEmail' placeholder='Email' required />
                                <div className='button-container'>
                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {showSignInPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowSignInPopup(false)}>&times;</span>
                            <h2>Sign In</h2>
                            <p>Enter email and password to sign in</p>
                            <br />
                            <form>
                                <label htmlFor='loginEmail'>Email:</label>
                                <input type='email' id='loginEmail' name='loginEmail' placeholder='Email' required />
                                <label htmlFor='loginPassword'>Password:</label>
                                <input type='password' id='loginPassword' name='loginPassword' placeholder='Password' required />
                                <span><p className='popup-link-align-right' onClick={openForgotPassPopup}>Forgot Password?</p></span>
                                <div className='button-container'>
                                    <button type='submit'>Log In</button>
                                </div>
                            </form>
                            <p className='popup-link-align-right'>Don't have an accont yet? <span onClick={openSignUpPopup}>Sign Up</span></p>
                        </div>
                    </div>
                </>
            )}

            {showSignUpPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup-signup'>
                        <div className='popup-content-signup'>
                            <span className='close' onClick={() => setShowSignUpPopup(false)}>&times;</span>
                            <h2>Create a New Account</h2>
                            <p>Please fill in the following details:</p>
                            <form>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerFirstname'>First Name:</label>
                                    <input type='text' id='registerFirstname' name='registerFirstname' placeholder='First Name' required />
                                    <label htmlFor='registerLastname'>Last Name:</label>
                                    <input type='text' id='registerLastname' name='registerLastname' placeholder='Last Name' required />
                                </div>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerEmail'>Email:</label>
                                    <input type='email' id='registerEmail' name='registerEmail' placeholder='Email' required />
                                    <label htmlFor='registerPhone'>Phone:</label>
                                    <input type='tel' id='registerPhone' name='registerPhone' placeholder='Phone' required />
                                </div>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerPassword'>Password:</label>
                                    <input type='password' id='registerPassword' name='registerPassword' placeholder='Password' required />
                                    <label htmlFor='registerConfirmPassword'>Confirm Password:</label>
                                    <input type='password' id='registerConfirmPassword' name='registerConfirmPassword' placeholder='Confirm Password' required />
                                </div>
                                <div className='role-container'>
                                    <fieldset>
                                        <legend>Type:</legend>
                                        <div className='role-radio'>
                                            <input type='radio' id='radBuyer' name='userType' value='buyer' defaultChecked />
                                            <label htmlFor='radBuyer'>Buyer</label>
                                        </div>
                                        <div className='role-radio'>
                                            <input type='radio' id='redSeller' name='userType' value='seller' />
                                            <label htmlFor='redSeller'>Seller</label>
                                        </div>
                                        <div className='role-radio'>
                                            <input type='radio' id='radMechanic' name='userType' value='mechanic' />
                                            <label htmlFor='radMechanic'>Mechanic</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className='button-container'>
                                    <button type='submit'>Create Account</button>
                                </div>
                            </form>
                            <p className='popup-link-align-right'>Already have an account? <span onClick={openSignInPopup}>Login</span></p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}