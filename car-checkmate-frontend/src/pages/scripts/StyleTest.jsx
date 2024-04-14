import React from 'react';
import '../styles/main.css';
//import '../styles/LandingPage.css';
import Footer from '../../components/scripts/footer';

export default function StyleTest() {
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

                    <h6 className='placeAtBottom-left'>
                        <span>Forgot your login?</span>&nbsp;-&nbsp;
                        <span>Privacy Policy</span>
                    </h6>

                </div>
            </div>
        </div>
    );
}
