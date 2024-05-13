import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import HeaderNav from '../../components/scripts/HeaderNav';
import Footer from '../../components/scripts/footer';
import UserNav from '../../components/scripts/UserNav';
import MechanicContent from '../../components/scripts/MechanicContent';

export default function Mechanic() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <div className='ctr-content-session'>
                    <UserNav />
                    <p className='user-title'>M e c h a n i c</p>
                    <MechanicContent />
                </div>
            </div>
            <Footer />
        </div>
    );
}