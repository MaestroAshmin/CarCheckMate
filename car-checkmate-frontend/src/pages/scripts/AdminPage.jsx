import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import HeaderNav from '../../components/scripts/HeaderNav';
import Footer from '../../components/scripts/footer';
import HeaderFilters from '../../components/scripts/HeaderFilters';
import CarList from '../../components/scripts/CarList';

export default function AdminPage() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <HeaderFilters />
                <br />
                <h2>Car Listings</h2>
                <CarList noPerPage={6} />
            </div>
            <Footer />
        </div>
    );
}