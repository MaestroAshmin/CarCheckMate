// src/pages/scripts/Listing/ListingPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../../components/scripts/footer';
import '../../styles/main.css';
import '../../styles/content.css';
import HeaderNav from '../../../components/scripts/HeaderNav';
import HeaderSearch from '../../../components/scripts/HeaderSearch';
import HeaderFilters from '../../../components/scripts/HeaderFilters';
import CarList from '../../../components/scripts/CarList';

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

  return (
    <div className='ctr-main'>
        <div className='ctr-sub-content'>
            <HeaderNav />
            <HeaderSearch />
            <HeaderFilters />
            <CarList noPerPage={21} />
        </div>
      <Footer />
    </div>
  );
}