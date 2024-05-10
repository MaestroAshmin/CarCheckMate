import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../../styles/Listing.css';

const Listing = ({ car }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const carPhotosArray = Array.isArray(car.carPhotos) ? car.carPhotos : [];
  const trimmedFilePathsArray = carPhotosArray.map(filePath => {
    const trimmedFilePath = filePath.trim();
    const parts = trimmedFilePath.split('\\');
    return parts[parts.length - 1];
  });

  const handleCarClick = () => {
    setExpanded(!expanded);
  };

  const handleDetailsClick = () => {
    navigate(`/car/${car.car_id}`);
  };

  return (
    <div className={`listing-container ${expanded ? 'expanded' : ''}`} onClick={handleCarClick}>
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
        {expanded && (
          <div className="details-container">
            <p>Car ID: {car.car_id}</p>
            <p>Seller Id: {car.seller_id}</p>
            <p>Registration Number: {car.registrationNo}</p>
            <p>Body Type: {car.bodyType}</p>
            <p>Color: {car.color}</p>
            <p>Engine Type: {car.engineType}</p>
            <p>Fuel Type: {car.fuelType}</p>
            <p>Has Been Sold: {car.hasBeenSold}</p>
            <p>Odometer: {car.odometer}</p>
            <p>Postcode: {car.postcode}</p>
            <p>Seller ID: {car.seller_id}</p>
            <p>State: {car.state}</p>
            <p>Street Name: {car.streetName}</p>
            <p>Suburb: {car.suburb}</p>
            <p>Title: {car.title}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Year: {car.year}</p>
            <p>Car Photos: {car.carPhotos}</p>
            <button onClick={handleDetailsClick}>View Details</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listing;
