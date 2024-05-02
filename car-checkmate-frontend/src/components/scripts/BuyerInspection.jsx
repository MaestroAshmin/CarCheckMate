import { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailSellerPopup from './EmailSellerPopup';
import BookMechanicPopup from './BookMechaniePopup';
import CancelPopup from './CancelPopup';

function BuyerInspection() {
    const schedules = [
        {
            carId: 'C1254',
            date: '24/04/2024',
            time: '10:30 am',
            mechanicStatus: 'Booked',
        },
        {
            carId: 'C1254',
            date: '24/04/2024',
            time: '10:30 am',
            mechanicStatus: 'Awaiting Acceptance',
        },
        {
            carId: 'C1254',
            date: '24/04/2024',
            time: '10:30 am',
            mechanicStatus: 'Not Require',
        },
    ];

    const [showEmailSellerPopup, setShowEmailSellerPopup] = useState(false);
    const [showBookMechanicPopup, setShowBookMechanicPopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);

    const openEmailSellerPopup = () => {
        setShowEmailSellerPopup(true);
    };

    const openBookMechanicPopup = (carId) => {
        setShowBookMechanicPopup(carId);
    };

    const openCancelPopup = () => {
        setShowCancelPopup(true);
    };

    return (
        <div>

            <EmailSellerPopup
                showEmailSellerPopup={showEmailSellerPopup}
                setShowEmailSellerPopup={setShowEmailSellerPopup}
            />

            <BookMechanicPopup
                showBookMechanicPopup={showBookMechanicPopup}
                setShowBookMechanicPopup={setShowBookMechanicPopup}
            />

            <CancelPopup
                showCancelPopup={showCancelPopup}
                setShowCancelPopup={setShowCancelPopup}
            />

            {schedules.map((schedule, index) => (
                <div key={index} className='ctr-schedule'>
                    <div className='ctr-schedule-buyer-detail'>
                        <h3>Car ID: <span>{schedule.carId}</span></h3>
                        <p>Date: <span>{schedule.date}</span> Time: <span>{schedule.time}</span></p>
                        <p>Mechanic Status: <span>{schedule.mechanicStatus}</span></p>
                    </div>
                    <div className='ctr-schedule-option'>
                        <button onClick={openEmailSellerPopup}>Email Seller</button>
                        <button onClick={()=>openBookMechanicPopup(schedule.carId)}>Book A Mechanic</button>
                        <button onClick={openCancelPopup}>Cancel booking</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BuyerInspection;