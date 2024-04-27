import React, { useState } from "react";

export default function AvailableRequestsPopup({ showAvailableRequestsPopup, setShowAvailableRequestsPopup }) {
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [requestsPerPage] = useState(3); // Number of requests per page

    // Sample data for available requests (replace with your actual data)
    const availableRequests = [
        { carId: 'CR1234', date: '24/06/2024', time: '10:30 am' },
        { carId: 'CR5678', date: '25/06/2024', time: '11:00 am' },
        { carId: 'CR91011', date: '26/06/2024', time: '09:00 am' },
        { carId: 'CR1234', date: '21/06/2024', time: '10:30 am' },
        { carId: 'CR5678', date: '11/06/2024', time: '11:00 am' },
        { carId: 'CR91011', date: '08/06/2024', time: '09:00 am' },
    ];

    // Calculate index of the last request on the current page
    const indexOfLastRequest = currentPage * requestsPerPage;
    // Calculate index of the first request on the current page
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    // Get current page of requests
    const currentRequests = availableRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {showAvailableRequestsPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup-request-inspection'>
                        <div className='popup-content-inspection'>
                            <span className='close' onClick={() => setShowAvailableRequestsPopup(false)}>&times;</span>
                            <h2>Available Requested Inspections</h2>
                            {currentRequests.map((request, index) => (
                                <div key={index} className='ctr-schedule'>
                                    <div className='ctr-schedule-request'>
                                        <h3>Car ID: <span>{request.carId}</span></h3>
                                        <p>Date: <span>{request.date}</span> Time: <span>{request.time}</span></p>
                                    </div>
                                    <div className='ctr-schedule-option'>
                                        <button>Accept</button>
                                    </div>
                                </div>
                            ))}
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(availableRequests.length / requestsPerPage) }, (_, index) => (
                                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
