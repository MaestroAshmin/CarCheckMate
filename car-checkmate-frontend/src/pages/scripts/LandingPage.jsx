
import React from 'react';
import '../styles/LandingPage.css';
import Footer from '../../components/scripts/footer';

export default function LandingPage() {
    return (
        <div>
            <div className="container">
                <div className='heading'>
                    <h3>carcheckmate.com.au</h3>
                </div>

                <div className='button--container'>
                    <button className='bttn'>Continue as a Guest</button>
                    <button className='bttn'>Sign In</button>
                    <button className='sign--up'>Create a new account</button>    
                </div>
            </div>
            
        </div>
    );
}
