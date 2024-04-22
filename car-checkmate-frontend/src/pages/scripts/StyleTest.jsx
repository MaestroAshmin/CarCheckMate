import React, { useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import HeaderNav from '../../components/scripts/HeaderNav';
import HeaderSearch from '../../components/scripts/HeaderSearch';
import Footer from '../../components/scripts/footer';
import HeaderFilters from '../../components/scripts/HeaderFilters';
import PhotosSlide from '../../components/scripts/PhotosSlide';
import CarList from '../../components/scripts/CarList';

export default function StyleTest() {
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <HeaderSearch />
                <br />
                <HeaderFilters />
                <PhotosSlide />
                <CarList noPerPage={6} />
            </div>
            <Footer />
        </div>
    );
}