import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import HeaderNav from '../../components/scripts/HeaderNav';
import Footer from '../../components/scripts/footer';
import UserNav from '../../components/scripts/UserNav';
import SellerContent from '../../components/scripts/SellerContent';

export default function Seller() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <div className='ctr-content-session'>
                    <UserNav />
                    <p className='user-title'>S e l l e r</p>
                    <SellerContent />
                </div>
            </div>
            <Footer />
        </div>
    );
}