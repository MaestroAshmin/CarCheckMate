import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmailSellerPopup from './EmailSellerPopup';
import BookMechanicPopup from './BookMechaniePopup';
import CancelPopup from './CancelPopup';

function BuyerInspection() {
    const [upcomingInspections, setUpcomingInspections] = useState([]);
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

    function formatDateString(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        // Fetch upcoming inspections for the buyer
        const fetchInspections = async (endpoint, setStateFunction) => {
            try {
                // Retrieve user data from local storage
                const userDataFromLocalStorage = localStorage.getItem('user');
                const userData = JSON.parse(userDataFromLocalStorage);
                const userId = userData._id;
                // Make a request to the API with the user ID as a parameter
                const response = await fetch(`http://localhost:3000/inspections/${endpoint}/${userId}`);
                const data = await response.json();

                // Update the component state with the fetched inspections data
                setStateFunction(data.inspectionsWithCarDetails || []);
            } catch (error) {
                console.error(`Error fetching ${endpoint} inspections:`, error);
            }
        };

        fetchInspections('upcoming-buyer', setUpcomingInspections);
    }, []);

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

            <div className="container">
                <div className="upcoming-inspections">
                    {upcomingInspections.length === 0 ? (
                        <p>No upcoming inspections</p>
                    ) : (
                        upcomingInspections.map((inspection, index) => (
                            <div key={index} className='ctr-schedule'>
                                <div className='ctr-schedule-buyer-detail'>
                                    <img src={inspection.car.carPhotos[0]} alt={`Car Image`} />
                                    <p>Date: <span>{formatDateString(inspection.inspectionDate)}</span></p>
                                    <p>Time: <span>{inspection.inspectionTime}</span></p>
                                    {inspection.mechanic_id ? (
                                        <p>Mechanic Status: <span>Your Inspection has been accepted by the mechanic</span></p>
                                    ) : (
                                        <p>No Mechanic has accepted the inspection</p>
                                    )}
                                </div>
                                <div className='ctr-schedule-option'>
                                    <button onClick={openEmailSellerPopup}>Email Seller</button>
                                    <button onClick={()=>openBookMechanicPopup(schedule.carId)}>Book A Mechanic</button>
                                    <button onClick={openCancelPopup}>Cancel booking</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default BuyerInspection;