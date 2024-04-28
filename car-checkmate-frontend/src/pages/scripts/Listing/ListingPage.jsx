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

  useEffect(() => {
      const fetchCars = async () => {
          try {
              const response = await axios.get('http://localhost:3000/cars/available-cars');
              //console.log(response.data); // Check the structure of the data first
              
              // Format the data before setting it in the state
              const unsoldCars = response.data.map(car => ({
                  car_id:car._id,
                  bodyType: car.bodyType,
                  color: car.color,
                  engineType: car.engineType,
                  fuelType: car.fuelType,
                  hasBeenSold: car.hasBeenSold,
                  make: car.make,
                  model: car.model,
                  odometer: car.odometer,
                  postcode: car.postcode,
                  price: car.price,
                  seller_id: car.seller_id,
                  state: car.state,
                  streetName: car.streetName,
                  suburb: car.suburb,
                  title: car.title,
                  transmission: car.transmission,
                  year: car.year,
                  carPhotos: car.carPhotos // Split the photo string into an array
              }));
  
              // Set the formatted data in the state
              setCars(unsoldCars);
              
          } catch (error) {
              console.log('Error fetching cars:', error);
          }
      };
  
      fetchCars();
  }, []);
  
  
  



  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;
  const navigate = useNavigate();



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
              car={car}
              handleCarClick={handleCarClick}q
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