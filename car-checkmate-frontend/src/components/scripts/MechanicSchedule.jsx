import { useState } from 'react';
import { Link } from 'react-router-dom';
import EmailBuyerPopup from './EmailBuyerPopup';
import CancelPopup from './CancelPopup';

function MechanicSchedule() {
    const schedules = [
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
            location: '1 John St, Hawthorn'
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
            location: '1 John St, Hawthorn'
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
            location: '1 John St, Hawthorn'
        },
    ];

    const [showEmailBuyerPopup, setShowEmailBuyerPopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);

    const openEmailBuyerPopup = () => {
        setShowEmailBuyerPopup(true);
    };

    const openCancelPopup = () => {
        setShowCancelPopup(true);
    };

    return (
        <div>
            <EmailBuyerPopup
                showEmailBuyerPopup={showEmailBuyerPopup}
                setShowEmailBuyerPopup={setShowEmailBuyerPopup}
            />

            <CancelPopup
                showCancelPopup={showCancelPopup}
                setShowCancelPopup={setShowCancelPopup}
            />

            {schedules.map((schedule, index) => (
                <div key={index} className='ctr-schedule'>
                    <div className='ctr-schedule-buyer-detail'>
                        <h3>Car ID: <span>{schedule.carId}</span></h3>
                        <p>Name: <span>{schedule.name}</span></p>
                        <p>Date: <span>{schedule.date}</span> Time: <span>{schedule.time}</span></p>
                        <p>Location: <span>{schedule.location}</span></p>
                    </div>
                    <div className='ctr-schedule-option'>
                        <button onClick={openEmailBuyerPopup}>Email Buyer</button>
                        <button><Link to='/InspectionReport'>Create A Report</Link></button>
                        <button onClick={openCancelPopup}>Cancel booking</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MechanicSchedule;
