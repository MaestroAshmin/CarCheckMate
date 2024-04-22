
import React from 'react';
import '../styles/LandingPage.css';
import Footer from '../../components/scripts/footer';
import { Link } from 'react-router-dom';
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
                    <Link to="/SignUpPage">
                        <button className='sign--up'>Create a new account</button>    
                    </Link> 
                </div>
            </div>
            <Footer />
        </div>
    );
}
