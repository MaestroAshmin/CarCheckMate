import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CarInfoPage.css';
import Navbar from '../../components/scripts/navbar';
import SearchBar from '../../components/scripts/searchbar';
import Footer from '../../components/scripts/footer';

export default function CarInfoPage() {
  const { carId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carImages = [
    'background.png',
    'car-image-2.jpg',
    'car-image-3.jpg',
    'car-image-4.jpg',
  ];

  // Fetch the car details based on the carId
  const car = {
    id: carId,
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    price: 7500,
    details: 'This is the detailed information about the car.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % carImages.length
    );
  };

  return (
    <div className="container">
      <Navbar />
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="inner-container">
        <div className="car-container">
          <img
            className="main-image"
            src={carImages[currentImageIndex]}
            alt={car.make}
          />
          <div className="image-controls">
            <button onClick={handlePrevImage}>&#8249;</button>
            <button onClick={handleNextImage}>&#8250;</button>
          </div>
        </div>
        <div className="details-container">
          <div className="price-container">
            <p>${car.price}</p>
          </div>
          <div className="action-buttons">
            <button>BUY THIS!</button>
            <button>BOOK INSPECTION</button>
            <button>BOOK MECHANIC</button>
          </div>
        </div>
      </div>
      <div className="details-section">
        <div className="details">
          <h2>Details</h2>
          <p>{car.details}</p>
        </div>
        <div className="features">
          <h2>Features</h2>
          <ul>
            {car.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className="specs">
          <h2>Specifications</h2>
          <ul>
            {car.specs.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}