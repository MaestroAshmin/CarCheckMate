import React, { useState, useEffect } from "react";
import axios from 'axios';
export default function AvailableRequestsPopup({ showAvailableRequestsPopup, setShowAvailableRequestsPopup }) {
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const [requestsPerPage] = useState(3); // Number of requests per page
    const [data, setData]=useState([]);


    const [mechanic, setMechanic] = useState("")

    // console.log(data)


    
        const fetchCarData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/inspections/upcoming-unclaimed-mechanic');
                const {inspectionsWithCarDetails}=response.data
                // console.log(response.data);
                // const extractedData = inspectionsWithCarDetails.map(({ _id, car_id, inspectionDate, inspectionTime }) => ({
                //     _id,
                //     car_id,
                //     inspectionDate: inspectionDate.slice(0, 10), // Extracting only the date part
                //     inspectionTime,
                //     car
                // }));
                setData(inspectionsWithCarDetails);
            } catch (error) {
                console.log('Error fetching car data:', error);
            }
        };
        // console.log(mechanic)
        useEffect(() => {
            // Retrieve user data from local storage
            const userDataFromLocalStorage = localStorage.getItem('user');
            if (userDataFromLocalStorage) {
                // Parse the user data to JSON
                const userData = JSON.parse(userDataFromLocalStorage);
                // Check if user data contains _id
                if (userData._id) {
                    // Update the formData state with the retrieved _id
                    setMechanic(userData._id)
                }
 
            }
        }, []);



    useEffect(() => {
        fetchCarData();
    },[]);

    // Calculate index of the last request on the current page
    const indexOfLastRequest = currentPage * requestsPerPage;
    // Calculate index of the first request on the current page
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    // Get current page of requests
    const currentRequests = data.slice(indexOfFirstRequest, indexOfLastRequest);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleSubmit = async (requestId) => {
        try {
            // Make a POST request to your endpoint with requestId and mechanicId
            const response = await axios.post(`http://localhost:3000/inspections/accept-inspection-mechanic/${requestId}`, {
                mechanicId: mechanic, // Include the mechanicId in the request body
            });
            
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
        }
    };
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
                                <div key={index} className='ctr-schedule' style={{ height: '220px' }}>
                                    <div className='ctr-schedule-request'>
                                        {/* {request.car && request.car.carPhotos && request.car.carPhotos.length > 0 && (
                                                <div className='car-photo'>
                                                    <img src={request.car.carPhotos[0]} alt="Car"  height="100px" width="auto"/>
                                                </div>
                                            )} */}
                                        <p>Date: <span>{formatDate(request.inspectionDate)}</span> Time: <span>{request.inspectionTime}</span></p>
                                            {
                                                request.car &&
                                                <p>{request.car.title}</p>
                                            }
                                            {
                                                request.car &&
                                                <p>Registration Number: <span>{request.car.registrationNo}</span></p>
                                            }
                                            {
                                                request.car &&
                                                <div>
                                                <p>Location: <span>{request.car.streetName} {request.car.suburb} {request.car.state} {request.car.postcode}</span></p>
                                                </div>
                                            }
                                    </div>
                                    <div className='ctr-schedule-option'>
                                    <form onSubmit={() => handleSubmit(request._id)}> 
                                        <input type="hidden" name="mechanicId" value={mechanic}/>
                                        <button type="submit">Accept</button>
                                    </form>
                                    </div>
                                </div>
                            ))}
                            <div className="pagination">
                                {Array.from({ length: Math.ceil(data.length / requestsPerPage) }, (_, index) => (
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