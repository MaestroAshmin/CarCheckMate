import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import HeaderNav from '../../components/scripts/HeaderNav';
import Footer from '../../components/scripts/footer';
import UserNav from '../../components/scripts/UserNav';
import ProfileContent from '../../components/scripts/ProfileContent';

export default function UserProfile() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <div className='ctr-content-session'>
                    <UserNav />
                    <ProfileContent />
                </div>
            </div>
            <Footer />
        </div>
    );
}