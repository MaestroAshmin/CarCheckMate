// src/pages/scripts/Listing/ListingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Listing from './Listing';
import Navbar from '../../../components/scripts/navbar';
import SearchBar from '../../../components/scripts/searchbar';
import Footer from '../../../components/scripts/footer';
import '../../styles/ListingPage.css';

export default function ListingPage() {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/cars');
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="listing-page-container">
        <div className="listings-container">
          {currentCars.map((car) => (
            <Listing
              key={car.id}
              car={{
                id: car._id,
                make: car.make,
                model: car.model,
                year: car.year,
                price: car.price,
                image: car.carPhotos[0], // Assuming the first photo is the main one
              }}
              handleCarClick={handleCarClick}
            />
          ))}
        </div>
        <div className="pagination">
          {[...Array(Math.ceil(cars.length / carsPerPage)).keys()].map((pageNumber) => (
            <button key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)}>
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}