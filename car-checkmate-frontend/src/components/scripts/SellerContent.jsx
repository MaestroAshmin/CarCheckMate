import { useState } from 'react';
import SellerSchedule from './SellerSchedule';
import SellerRequest from './SellerRequest';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function SellerContect() {
    const [cars, setCars] = useState([
        { img: 'images/car-01.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '24/04/2024' },
        { img: 'images/car-02.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '26/04/2024' },
        { img: 'images/car-03.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '20/04/2024' },
        { img: 'images/car-04.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '13/04/2024' },
        { img: 'images/car-05.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '11/04/2024' },
        { img: 'images/car-06.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '24/04/2024' },
        { img: 'images/car-07.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '24/04/2024' },
        { img: 'images/car-08.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '26/04/2024' },
        { img: 'images/car-09.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '20/04/2024' },
        { img: 'images/car-10.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '13/04/2024' },
        { img: 'images/car-11.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '11/04/2024' },
        { img: 'images/car-12.jpg', id: 'C1254', link: '/car/662dc1d0cecfcbf306bb9e22', date: '24/04/2024' },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const carsPerPage = 5;

    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='ctr-user-content'>
            <div className='ctr-user-content-left'>
                <h3>Upcoming Schedule</h3>
                <SellerSchedule />
            </div>
            <div className='ctr-user-content-right'>
                <h3>New Booked Inspection Requests</h3>
                <SellerRequest />
                <br />

                <h3>View Your Car Listing</h3>
                <Link to ='/CarAdPage'><button className='ctr-user-button'>Add a new list</button></Link>
                {currentCars.map((car, index) => (
                    <div key={index} className='ctr-user-content-right-report'>
                        <Link to={car.link}><img src={car.img} /></Link>
                        <span>{car.id}</span>&nbsp;-&nbsp;
                        <span>{car.date}</span>
                        <br />
                        <Link to={car.link}>View Details</Link>
                    </div>
                ))}
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

export default SellerContect;

