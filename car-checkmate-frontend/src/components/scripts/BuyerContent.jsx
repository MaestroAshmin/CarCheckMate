import { useState } from 'react';
import BuyerInspection from './BuyerInspection';
import BuyerInspectionPast from './BuyerInspectionPast';
import SellerRequest from './SellerRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function BuyerContent() {

    return (
        <div className='ctr-user-content'>
            <div className='ctr-user-content-left'>
                <h3>Upcoming Inspections</h3>
                <BuyerInspection />
            </div>
            <div className='ctr-user-content-right'>
                <h3>Past Inspections</h3>
                <BuyerInspectionPast/>
            </div>
       </div>
    );
}

export default BuyerContent;

