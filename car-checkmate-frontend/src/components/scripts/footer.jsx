import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <footer className='ctr-footer'>
            <div className='footer-left'>
                <h3><img src="/images/logo-cut.png" alt="Logo" /> Car<span>Check</span>Mate</h3>
                <p className='footer-links'>
                    <Link to='/Homepage'>Home</Link>
                    <Link to='/ListingPage'>Listing</Link>
                    <Link to='/Selling'>Sell</Link>
                    <Link to='/AboutUs'>About Us</Link>
                    <Link to='/Faq'>Faq</Link>
                </p>
                <p className='footer-company-name'>© 2024 AC3 Swinburne Project</p>
            </div>
            <div className='footer-center'>
                <div className='footer-center-contact'>
                    <FontAwesomeIcon icon={faMapMarker} className='footer-center-icon' />
                    <p>
                        <Link to="https://www.google.com/maps/place/Swinburne+University+of+Technology/@-37.8216292,145.0390703,17z/data=!4m15!1m8!3m7!1s0x6ad6422d82d423fd:0xa36511772c8c752!2sJohn+St,+Hawthorn+VIC+3122!3b1!8m2!3d-37.8216292!4d145.0390703!16s%2Fg%2F1tkrlynb!3m5!1s0x6ad642326bae5aaf:0x75e96bbd4988f769!8m2!3d-37.8221504!4d145.0389546!16zL20vMDFrcV9z?entry=ttu" target="_blank">
                            John St, Hawthorn VIC 3122
                        </Link>
                    </p>
                </div>
                <div className='footer-center-contact'>
                    <FontAwesomeIcon icon={faPhone} className='footer-center-icon' />
                    <p>04xx xxx xxx</p>
                </div>
                <div className='footer-center-contact'>
                    <FontAwesomeIcon icon={faEnvelope} className='footer-center-icon' />
                    <p><a href='mailto:carcheckmate@mail.com'>carcheckmate@mail.com</a></p>
                </div>
            </div>
            <div className='footer-right'>
                <p className='footer-company-about'>
                    <span>About the company</span>
                    Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
                </p>
                <div className='footer-icons'>
                    <a href='#'><FontAwesomeIcon icon={faFacebook} /></a>
                    <a href='#'><FontAwesomeIcon icon={faTwitter} /></a>
                    <a href='#'><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a href='#'><FontAwesomeIcon icon={faGithub} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;