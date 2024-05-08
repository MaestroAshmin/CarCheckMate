// src/pages/scripts/Listing/Listing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Listing.css';

export default function Listing({ car }) {
  console.log(car);
  const navigate = useNavigate();
// Ensure carPhotos is an array
  const carPhotosArray = Array.isArray(car.carPhotos) ? car.carPhotos : [];

  // Trim each file path to remove leading and trailing whitespace
  const trimmedFilePathsArray = carPhotosArray.map(filePath => {
    const trimmedFilePath = filePath.trim();
    const parts = trimmedFilePath.split('\\');
    return parts[parts.length - 1];
  });

  const handleCarClick = () => {
    // Navigate to the CarInfoPage when a car is clicked
    navigate(`/car/${car.car_id}`);
  };

  return (
    <div className="listing-container" onClick={handleCarClick}>
      <div className="image-container">
      <img src={trimmedFilePathsArray[2]} alt={car.make} className="listing-image" />
      </div>
      <div className="info-container">
        <div className="make-model">
          <h3>{car.make} {car.model}</h3>
        </div>
        <div className="year-price">
          <p>Year: {car.year}</p>
          <p>Price: ${car.price}</p>
        </div>
      </div>
    </div>
  );
}