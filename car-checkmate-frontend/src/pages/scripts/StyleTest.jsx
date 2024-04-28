import { useState } from 'react';
import { Link } from 'react-router-dom';

function StyleTest() {
    // Example array of schedule data
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
        // Add more schedule objects as needed
    ];

    return (
        <div>
            {schedules.map((schedule, index) => (
                <div key={index} className='ctr-schedule'>
                    <div className='ctr-schedule-buyer-detail'>
                        <h3>Car ID: <span>{schedule.carId}</span></h3>
                        <p>Date: <span>{schedule.date}</span> Time: <span>{schedule.time}</span></p>
                        <p>Mechanic Status: <span>{schedule.mechanicStatus}</span></p>
                    </div>
                    <div className='ctr-schedule-option'>
                        <button>Email Seller</button>
                        <button>Book A Mechanic</button>
                        <button>Cancel booking</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StyleTest;