// src/components/FetchCarDetails/FetchCarDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchCarDetails = () => {
  const [carID, setCarID] = useState('');
  const [carDetails, setCarDetails] = useState(null);

  const handleChange = (e) => {
    setCarID(e.target.value);
  };

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/cars/${carID}`);
      setCarDetails(response.data);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  useEffect(() => {
    if (carID) {
      fetchCarDetails();
    }
  }, [carID]);

  return (
    <div>
      <input
        type="text"
        value={carID}
        onChange={handleChange}
        placeholder="Enter Car ID"
      />
      <button onClick={fetchCarDetails}>Fetch Car Details</button>
      {carDetails && (
        <div>
          <p>Make: {carDetails.make}</p>
          <p>Model: {carDetails.model}</p>
          <p>Suburb: {carDetails.suburb}</p>
          <p>Postcode: {carDetails.postcode}</p>
          <p>State: {carDetails.state}</p>
          <p>Color: {carDetails.color}</p>
          <p>Price: {carDetails.price}</p>
          <p>Odometer: {carDetails.odometer}</p>
          <p>Transmission: {carDetails.transmission}</p>
          <p>Year: {carDetails.year}</p>
          <p>Engine Type: {carDetails.engineType}</p>
          <p>Fuel Type: {carDetails.fuelType}</p>
          <p>Body Type: {carDetails.bodyType}</p>
          <p>Car photos: {carDetails.carPhotos}</p>
        </div>
      )}
    </div>
  );
};

export default FetchCarDetails;