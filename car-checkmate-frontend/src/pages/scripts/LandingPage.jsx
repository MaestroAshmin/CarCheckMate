
import React from 'react';
import '../styles/LandingPage.css';
import Footer from '../../components/scripts/footer';

export default function LandingPage() {
    return (
        <div>
            <div className="container">
                <div className='heading'>
                    <img src="logo.png" alt="Logo"/>
                </div>

                <div className='welcome--container'>
                    <h1 className='welcome--text'>Delighted to<br/> welcome you!</h1>
                </div>

                <div className='button--container'>
                    <button className='bttn'>Continue as a guest</button>
                    <button className='bttn'>Sign In</button>
                    <button className='sign--up'>Create a new account</button>    
                </div>
            </div>
            <Footer />
        </div>
    );
}
