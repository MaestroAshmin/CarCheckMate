import React, { useState, useEffect } from 'react';
import Listing from './Listing';

export default function ListingPage() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch car data from an API
    const fetchCarData = async () => {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, []);

  return (
    <div>
      <h1>Car Listings</h1>
      <div className="listings-container">
        {cars.map((car) => (
          <Listing key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}