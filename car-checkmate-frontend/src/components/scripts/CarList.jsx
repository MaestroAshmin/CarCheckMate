import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/carlist.css';
import CarAd from '../scripts/CarAd';

export default function CarList({ noPerPage }) {
    const [cars, setCars] = useState ([
        {
            id: 1,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 15000,
            image: 'toyota-camry.jpg'
        },
        {
            id: 2,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 28000,
            image: 'honda-civic.jpg'
        },
        {
            id: 3,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 35000,
            image: 'toyota-camry.jpg'
        },
        {
            id: 4,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 48000,
            image: 'honda-civic.jpg'
        },
        {
            id: 5,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 55000,
            image: 'toyota-camry.jpg'
        },
        {
            id: 6,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 68000,
            image: 'honda-civic.jpg'
        },
        {
            id: 7,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 75000,
            image: 'toyota-camry.jpg'
        },
        {
            id: 8,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 88000,
            image: 'honda-civic.jpg'
        },
        {
            id: 9,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 95000,
            image: 'toyota-camry.jpg'
        },
        {
            id: 10,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 108000,
            image: 'honda-civic.jpg'
        },
        {
            id: 11,
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
            price: 115000,
            image: 'toyota-camry.jpg'
        },
        {
            id: 12,
            make: 'Honda',
            model: 'Civic',
            year: 2018,
            price: 128000,
            image: 'honda-civic.jpg'
        },
        // Add more car objects as needed
    ]);

    // State for current page number
    const [currentPage, setCurrentPage] = useState(1);
    // Number of cars to display per page
    //const carsPerPage = 6;
    const carsPerPage = noPerPage;

    const navigate = useNavigate();

    const handleCarClick = (carId) => {

        // Navigate to car details page
        navigate(`/car/${carId}`);
    };

    // Calculate indexes of cars to display
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    // Get current page's cars
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='ctr-listing-page'>
                <h1>
                    All Used Vehicles for sale
                </h1>
                <div className='sub-ctr-listing-page'>
                    <div className='ctr-listing'>
                        {currentCars.map((car) => (
                            <CarAd key={car.id} car={car} handleCarClick={handleCarClick} />
                        ))}
                    </div>
                    <div className='pagination'>
                        {[...Array(Math.ceil(cars.length / carsPerPage)).keys()].map((pageNumber) => (
                            <button key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)}>
                            {pageNumber + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}