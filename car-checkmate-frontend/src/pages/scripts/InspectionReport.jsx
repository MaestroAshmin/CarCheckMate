import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import HeaderNav from '../../components/scripts/HeaderNav';
import Footer from '../../components/scripts/footer';
import UserNav from '../../components/scripts/UserNav';
import MechanicReport from '../../components/scripts/MechanicReport';

export default function InspectionReport() {
   

    const { carId, mechanicId, sellerId, buyerId, inspectionId } = useParams();

    // Now you can use these parameters in your component as needed
    console.log('Car ID:', carId);
    console.log('Mechanic ID:', mechanicId);
    console.log('Seller ID:', sellerId);
    console.log('Buyer ID:', buyerId);
    console.log('Inspection ID:', inspectionId);
   
    return (
        <div className='ctr-main'>
            <div className='ctr-sub-content'>
                <HeaderNav />
                <div className='ctr-content-session'>
                    <UserNav />
                    <MechanicReport 
                        carId={carId}
                        mechanicId={mechanicId}
                        sellerId={sellerId}
                        buyerId={buyerId}
                        inspectionId={inspectionId}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}