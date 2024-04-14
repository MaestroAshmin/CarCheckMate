//import React from 'react';
import '../styles/main.css';
//import '../styles/LandingPage.css';
import Footer from '../../components/scripts/footer';
import React, { useState } from 'react';

export default function StyleTest() {

    const [showPopup, setShowPopup] = useState(false);

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
                            <button className='btn-login'>Sign In</button>  
                    </div>
                    <button className='btn-signup'>Create a new account</button>
                    <p className='ctr-sub-right-font-p'>Benefits of signing up with us.</p>

                    <h6 className='placeAtBottom-left'>
                        {/*<span>Forgot your login?</span>&nbsp;-&nbsp;*/}
                        <span onClick={() => setShowPopup(true)}>Forgot your login?</span>&nbsp;-&nbsp;
                        <span>Privacy Policy</span>
                    </h6>
                </div>
            </div>

            {showPopup && (
            <div className='popup'>
                <div className='popup-content'>
                    <span className='close' onClick={() => setShowPopup(false)}>&times;</span>
                    <h2>Forgot Your Password?</h2>
                    <p>Please enter your email address below to reset your password.</p>
                    <form>
                        <label htmlFor='email'>Email:</label>
                        <input type='email' id='email' name='email' required />
                        <div className='button-container'>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )}

        </div>
    );
}
