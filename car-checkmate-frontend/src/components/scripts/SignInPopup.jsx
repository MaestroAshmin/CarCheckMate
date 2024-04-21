import React from "react";

export default function SignInPopup({ showSignInPopup, setShowSignInPopup, openForgotPassPopup, openSignUpPopup }) {

    return (
        <>
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
                                <br />
                                <span className='link-forgot-pass' onClick={openForgotPassPopup}>Forgot Password?</span>
                                <div className='button-container'>
                                    <button type='submit'>Log In</button>
                                </div>
                            </form>
                            <p className='popup-link-align-right'>Don't have an account yet? <span onClick={openSignUpPopup}>Sign Up</span></p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}