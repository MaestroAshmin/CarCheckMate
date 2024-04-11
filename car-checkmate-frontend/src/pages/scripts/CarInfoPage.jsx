import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CarInfoPage.css';
import Navbar from '../../components/scripts/navbar';
import SearchBar from '../../components/scripts/searchbar';
import Footer from '../../components/scripts/footer';

export default function CarInfoPage() {
  const { carId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
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
    price: 58990,
    details: 'This is the detailed information about the car.',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    specs: {
      kilometres: '62,613km',
      'Seller type': 'Dealer: Used',
      Price: '$58,990',
      Transmission: 'Automatic',
      'Body type': 'Hatch, 5 Doors, 4 Seats',
      'Drive type': 'Front Wheel Drive',
      Engine: '3 cyl, 1 L',
      'Fuel type': 'Premium Unleaded Petrol',
      'Fuel consumption': '5.50 L / 100 km',
      'Colour ext / int': 'Silver / -',
      Registration: 'YIQ841',
      'Rego expiry': '03 Jun 2024',
      VIN: 'MA3GFC31S003S9708',
    },
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
            <p>Price</p>
            <p>${car.price}</p>
          </div>
          <div className="action-buttons">
            <button>BUY THIS</button>
            <button>BOOK INSPECTION</button>
            <button>BOOK MECHANIC</button>
          </div>
        </div>
      </div>
      <div className="details-section">
        <div className="tabs">
          <button
            className={activeTab === 'details' ? 'active' : ''}
            onClick={() => handleTabClick('details')}
          >
            Details
          </button>
          <button
            className={activeTab === 'features' ? 'active' : ''}
            onClick={() => handleTabClick('features')}
          >
            Features
          </button>
          <button
            className={activeTab === 'specs' ? 'active' : ''}
            onClick={() => handleTabClick('specs')}
          >
            Specs
          </button>
        </div>
        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details">
              <h2>Details</h2>
              <p>{car.details}</p>
            </div>
          )}
          {activeTab === 'features' && (
            <div className="features">
              <h2>Features</h2>
              <ul>
                {car.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="specs">
              <h2>Specifications</h2>
              <ul>
                {Object.entries(car.specs).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}