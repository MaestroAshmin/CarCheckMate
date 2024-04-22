import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Listing.css';

export default function Listing({ car }) {
  const navigate = useNavigate();

  const handleCarClick = () => {
    // Navigate to the CarInfoPage when a car is clicked
    navigate(`/car/${car.id}`);
  };

  return (
    <div className="listing-container" onClick={handleCarClick}>
      <div className="image-container">
        <img src={car.image} alt={car.make} className="listing-image" />
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