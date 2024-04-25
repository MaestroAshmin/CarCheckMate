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
  const [carData, setCarData] = useState({ carPhotos: [] });
  const [isLoading, setIsLoading] = useState(true);

  const fetchCarData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cars/single-car-details/${carId}`);
      setCarData(response.data); // Assuming response.data is the correct format
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
                <p>Price</p>
                <p>${carData.price}</p>
              </div>
              <div className="action-buttons">
                <button>BUY
