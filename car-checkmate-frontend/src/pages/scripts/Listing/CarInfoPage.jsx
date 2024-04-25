// car-checkmate-frontend/src/pages/scripts/Listing/CarInfoPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/CarInfoPage.css';
import SearchBar from '../../../components/scripts/searchbar';
import Footer from '../../../components/scripts/footer';

export default function CarInfoPage() {
  const { carId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [carData, setCarData] = useState({
    carPhotos: [],
    make: '',
    model: '',
    year: '',
    suburb: '',
    color: '',
    price: '',
    odometer: '',
    transmission: '',
    engineType: '',
    fuelType: '',
    bodyType: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/cars/${carId}?pageType=carInfoPage`);
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

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carData.carPhotos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % carData.carPhotos.length
    );
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
                src={carData.carPhotos[currentImageIndex]}
                alt={`${carData.make} ${carData.model}`}
                onClick={handleImageClick}
              />
              {showImageOverlay && (
                <div className="image-overlay show" onClick={handleNextImage}>
                  <img
                    className="enlarged-image"
                    src={carData.carPhotos[currentImageIndex]}
                    alt={`${carData.make} ${carData.model}`}
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
                {carData.carPhotos.map((image, index) => (
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
                <div className="image-count">+{carData.carPhotos.length - 1}</div>
              </div>
            </div>
            <div className="details-container">
              <div className="price-container">
                <p>Price${carData.price}</p>
              </div>
              <div className="action-buttons">
                <button>BUY THIS !</button>
                <button>BOOK AN INSPECTION</button>
                <button>BOOK A MECHANIC</button>
              </div>
            </div>
          </div>
          <div className="details-section">
            <div className="tab-content">
              <div className="car-details">
                <h2> Make{carData.make} Model{carData.model} Color{carData.year}</h2>
                {/* <p>{carData.details}</p>
                <h3>Features</h3>
                <ul>
                  {carData.features && carData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h3>Specifications</h3> */}
                <ul>
                  <li>Suburb {carData.suburb}</li>
                  <li>Odometer {carData.odometer}</li>
                  <li>Transmission {carData.transmission}</li>
                  <li>Engine Type {carData.engineType}</li>
                  <li>Fuel Type {carData.fuelType}</li>
                  <li>Body Type {carData.bodyType}</li>
                </ul>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
