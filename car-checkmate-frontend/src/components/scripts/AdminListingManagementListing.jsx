// AdminListingManagementListing.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../styles/AdminListing.css';

const Listing = ({ car }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const carPhotosArray = Array.isArray(car.carPhotos) ? car.carPhotos : [];
  const trimmedFilePathsArray = carPhotosArray.map(filePath => {
    const trimmedFilePath = filePath.trim();
    const parts = trimmedFilePath.split('\\');
    return parts[parts.length - 1];
  });

  const handleDetailsClick = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="listing-container">
      <div className="image-container">
        {trimmedFilePathsArray.map((photoUrl, index) => (
          <img
            key={index}
            src={photoUrl}
            alt={car.make}
            className="listing-image"
            onClick={() => {
              setModalIsOpen(true);
            }}
          />
        ))}
      </div>
      <div className="info-container">
        <div className="make-model">
          <h3>{car.title}</h3>
        </div>
        <div className="year-price">
          <p>{car.make} {car.model} ({car.year})</p>
          <p>${car.price}</p>
        </div>
        <div className="details-button">
          <button onClick={handleDetailsClick}>View Details</button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Car Details Modal"
      >
        <div className="modal-content">
          <h2>{car.make} {car.model}</h2>
          <p><strong>Title:</strong> {car.title}</p>
          <p><strong>Car ID:</strong> {car.car_id}</p>
          <p><strong>Seller ID:</strong> {car.seller_id}</p>
          <p><strong>Registration Number:</strong> {car.registrationNo}</p>
          <p><strong>Body Type:</strong> {car.bodyType}</p>
          <p><strong>Odometer:</strong> {car.odometer} km </p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Color:</strong> {car.color}</p>
          <p><strong>Engine Type:</strong> {car.engineType}</p>
          <p><strong>Seller Address:</strong> {car.streetName}</p>
          <p><strong>Status:</strong> {car.hasBeenSold ? 'Sold' : 'Listed'}</p>
          <div className="button-container">
            <button onClick={() => navigate(`/car/${car.car_id}`)}>View Listing</button>
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
          <h4>Uploaded Photos</h4>
          <div className="photo-list">            
            {trimmedFilePathsArray.map((photoUrl, index) => (
              <img
                key={index}
                src={photoUrl}
                alt={`Photo ${index + 1}`}
                className="modal-photo"
                onClick={() => window.open(photoUrl, '_blank')}
              />
            ))}
          </div>          
        </div>
      </Modal>
    </div>
  );
};

export default Listing;
