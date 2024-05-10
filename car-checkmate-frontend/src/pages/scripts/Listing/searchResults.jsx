import {React, useState} from 'react';
import Listing from '../../scripts/Listing/Listing';
import { useNavigate } from 'react-router-dom';

export default function SearchResults({ searchResults, noPerPage }) {
    // State for current page number
    const [currentPage, setCurrentPage] = useState(1);
    // Number of cars to display per page
    const carsPerPage = noPerPage;

    const navigate = useNavigate();

    // Calculate indexes of cars to display
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    
    

    
    // Map search results to change _id to car_id
    const updatedSearchResults = searchResults.map(car => ({ ...car, car_id: car._id }));
    // Get current page's cars
    const currentCars = updatedSearchResults.slice(indexOfFirstCar, indexOfLastCar);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className='ctr-listing-page'>
                <h1>
                    Search Results
                </h1>
                <div className='sub-ctr-listing-page'>
                    <div className='ctr-listing'>
                        {currentCars.map((car) => (
                            <Listing
                                key={car._id}
                                car={car}
                            />
                        ))}
                    </div>
                    <div className='pagination'>
                        {[...Array(Math.ceil(updatedSearchResults.length / carsPerPage)).keys()].map((pageNumber) => (
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