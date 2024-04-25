import React from "react";
import '../../pages/styles/main.css';
import '../styles/information.css';

export default function InfoCarType() {
    return (
        <div className='ctr-main-info'>
            <div className='ctr-main-info-header'>
                <h2>Which Type Suits You</h2>
            </div>
            <img src ='images/car-types.jpg' alt='' />
        </div>
    );
}