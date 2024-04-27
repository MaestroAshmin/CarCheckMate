import { useState } from 'react';

function SellerRequest() {
    const requests = [
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '25/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '27/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '2204/2024',
            time: '10:30 am',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const requestsPerPage = 3;

    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = requests.slice(indexOfFirstRequest, indexOfLastRequest);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {currentRequests.map((request, index) => (
                <div key={index} className='ctr-schedule-book'>
                    <div className='ctr-schedule-seller'>
                        <p><b>Car ID</b>: <span>{request.carId}</span> - <span>{request.date}</span>, <span>{request.time}</span></p>
                    </div>
                    <div className='ctr-schedule-option-seller-request'>
                        <button>Accept</button>
                        <button>Deny</button>
                    </div>
                </div>
            ))}

            <div className="pagination">
                {Array.from({ length: Math.ceil(requests.length / requestsPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                ))}
            </div>
        </div>
    );
}

export default SellerRequest;
