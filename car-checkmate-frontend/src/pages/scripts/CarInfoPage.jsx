//CarInfoPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CarInfoPage.css';
import Navbar from '../../components/scripts/navbar';
import SearchBar from '../../components/scripts/searchbar';
import Footer from '../../components/scripts/footer';

export default function CarInfoPage() {
  const { carId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('details');
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [carData, setCarData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`/api/cars/${carId}`);
      setCarData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching car data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCarData();
  }, [carId]);

  const carImages = carData.carPhotos ? carData.carPhotos.map((photo) => photo) : [];

  const car = {
    id: carData.id || '',
    make: carData.make || '',
    model: carData.model || '',
    year: carData.year || '',
    price: carData.price || 0,
    details: carData.details || '',
    features: carData.features || [],
    specs: {
      kilometres: carData.odometer || '',
      'Seller type': 'Dealer: Used',
      Price: `$${carData.price || 0}`,
      Transmission: carData.transmission || '',
      'Body type': carData.bodyType || '',
      'Drive type': 'Front Wheel Drive', // Assuming this value is not provided by the API
      Engine: carData.engineType || '',
      'Fuel type': carData.fuelType || '',
      'Fuel consumption': '5.50 L / 100 km', // Assuming this value is not provided by the API
      'Colour ext / int': `${carData.color || ''} / -`,
      Registration: 'YIQ841', // Assuming this value is not provided by the API
      'Rego expiry': '03 Jun 2024', // Assuming this value is not provided by the API
      VIN: 'MA3GFC31S003S9708', // Assuming this value is not provided by the API
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

  const handleImageClick = () => {
    setShowImageOverlay(true);
  };

  const handleCloseImageOverlay = () => {
    setShowImageOverlay(false);
  };

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="nav-container">
            <img className="logo" src="logo.png" alt="Logo" />
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/listing">Listing</Link>
              <Link to="/carinfo">About</Link>
            </div>
          </div>
          <div className="search-bar-container">
            <SearchBar />
          </div>
          <div className="inner-container">
            <div className="main-image-container">
              <img
                className="main-image"
                src={carImages[currentImageIndex]}
                alt={car.make}
                onClick={handleImageClick}
              />
              {showImageOverlay && (
                <div className="image-overlay show" onClick={handleNextImage}>
                  <img
                    className="enlarged-image"
                    src={carImages[currentImageIndex]}
                    alt={car.make}
                  />
                  <div className="image-controls">
                    <button onClick={handlePrevImage}>&#8249;</button>
                    <button onClick={handleNextImage}>&#8250;</button>
                  </div>
                  <button className="close-button" onClick={handleCloseImageOverlay}>
                    &times;
                  </button>
                </div>
              )}
            </div>
            <div className="additional-images-container">
              <div className="photo-frame">
                {carImages.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`Car Image ${index + 1}`} />
                  </div>
                ))}
                <div className="image-count">+{carImages.length - 1}</div>
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
        </>
      )}
    </div>
  );
}