import { useState, useEffect } from 'react';
import SellerSchedule from './SellerSchedule';
import SellerRequest from './SellerRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import CarInfo from '../../pages/scripts/Listing/CarInfo';

function SellerContent() {
    const [cars, setCars] = useState([]);


    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 5;

    useEffect(() => {
        const fetchCars = async () => {
            try {
                // Retrieve user data from local storage
                const userDataFromLocalStorage = localStorage.getItem('user');
                const userData = JSON.parse(userDataFromLocalStorage);
                const userId = userData._id;
                // Fetch cars uploaded by the seller from the API
                const response = await fetch(`http://localhost:3000/cars/seller-cars/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                const data = await response.json();
                setCars(data); // Update state with fetched cars
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
        <div className='ctr-user-content'>
            <div className='ctr-user-content-left'>
                <h3>Your Inspection Schedules</h3>
                <SellerSchedule />
            </div>
            <div className='ctr-user-content-right'>
                <h3>Inspection Requests</h3>
                <SellerRequest />
                <br />

                <h3>View Your Car Listing</h3>
                <Link to='/CarAdPage'><button className='ctr-user-button'>Add a new list</button></Link>
                {currentCars.map((car, index) => (
                    <div key={index} className='ctr-user-content-right-report'>
                        <Link to={`/seller-car/${car._id}`}><img src={car.carPhotos[0]} /></Link>
                        <span>{car.id}</span>&nbsp;-&nbsp;
                        <span>{car.date}</span>
                        <br />
                        <Link to={`/car/${car._id}`}>View Details</Link>
                    </div>
                ))}
                <br />
                <br />
                <div className="pagination">
                    {Array.from({ length: Math.ceil(cars.length / carsPerPage) }, (_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            </div>
       </div>
    );
}

export default SellerContent;

