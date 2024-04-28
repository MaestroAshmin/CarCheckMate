// src/pages/scripts/Listing/ListingPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Listing from './Listing';
import Navbar from '../../../components/scripts/navbar';
import SearchBar from '../../../components/scripts/searchbar';
import Footer from '../../../components/scripts/footer';
import '../../styles/ListingPage.css';

import axios from 'axios';

export default function ListingPage() {
  const [cars, setCars] = useState([
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
  const [unSoldCar, setUnSoldCar] = useState([]);

  useEffect(() => {
      const fetchCars = async () => {
          try {
              const response = await axios.get('http://localhost:3000/cars/available-cars');
              //console.log(response.data); // Check the structure of the data first
              
              // Format the data before setting it in the state
              const unsoldCars = response.data.map(car => ({
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
                  carPhotos: car.carPhotos.split(',') // Split the photo string into an array
              }));
  
              // Set the formatted data in the state
              setCars(unsoldCars);
              
          } catch (error) {
              console.log('Error fetching cars:', error);
          }
      };
  
      fetchCars();
  }, []);
  
  console.log(cars);
  



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