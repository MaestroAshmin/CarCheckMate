import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import ForgotPasswordPopup from '../../components/scripts/ForgotPasswordPopup';
import SignInPopup from '../../components/scripts/SignInPopup';
import SignUpPopup from '../../components/scripts/SignUpPopup';

import HeaderNav from '../../components/scripts/HeaderNav';
import HeaderSearch from '../../components/scripts/HeaderSearch';
import Footer from '../../components/scripts/Footer';
import HeaderFilters from '../../components/scripts/HeaderFilters';

export default function StyleTest() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <HeaderSearch />
                <br />
                <HeaderFilters />
            </div>
            <Footer />
        </div>
    );
}