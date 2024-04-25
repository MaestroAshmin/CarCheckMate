import { useState } from 'react';

function Schedule() {
    // Example array of schedule data
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
        // Add more schedule objects as needed
    ];

    return (
        <div>
            {schedules.map((schedule, index) => (
                <div key={index} className='ctr-schedule'>
                    <div className='ctr-schedule-buyer-detail'>
                        <h3>Car ID: <span>{schedule.carId}</span></h3>
                        <p>Name: <span>{schedule.name}</span></p>
                        <p>Date: <span>{schedule.date}</span> Time: <span>{schedule.time}</span></p>
                        <p>Location: <span>{schedule.location}</span></p>
                    </div>
                    <div className='ctr-schedule-option'>
                        <button>Email Buyer</button>
                        <button>Create A Report</button>
                        <button>Cancel booking</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Schedule;
