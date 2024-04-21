import React from "react";

export default function SignUpPopup({ showSignUpPopup, setShowSignUpPopup, openSignInPopup }) {

    return (
        <>
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
        </>
    );
}