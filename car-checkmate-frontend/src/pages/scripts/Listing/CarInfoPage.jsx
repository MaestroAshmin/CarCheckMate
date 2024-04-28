import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../styles/CarInfoPage.css';
import HeaderNav from '../../../components/scripts/HeaderNav';
import HeaderSearch from '../../../components/scripts/HeaderSearch';
import HeaderFilters from '../../../components/scripts/HeaderFilters';
import Footer from '../../../components/scripts/footer';

export default function CarInfoPage() {
  const { _id } = useParams(); // Use _id instead of carId


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);




  useEffect(() => {
    const fetchCars = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cars/available-cars');
            //console.log(response.data); // Check the structure of the data first
            
            // Format the data before setting it in the state
            const unsoldCars = response.data.map(car => ({
                car_id: car._id,
                bodyType: car.bodyType,
                color: car.color,
                engineType: car.engineType,
                fuelType: car.fuelType,
                hasBeenSold: car.hasBeenSold,
                make: car.make,
                model: car.model,
                odometer: car.odometer,
                postcode: car.postcode,
                price: car.price,
                seller_id: car.seller_id,
                state: car.state,
                streetName: car.streetName,
                suburb: car.suburb,
                title: car.title,
                transmission: car.transmission,
                year: car.year,
                carPhotos: car.carPhotos // Split the photo string into an array
            }));

            // Set the formatted data in the state
            setCars(unsoldCars);
            setIsLoading(false);
            
            // Check if a specific car is available and set its data
            const unsoldCar = unsoldCars.find(car => car.car_id === _id);
            if (unsoldCar) {
                setCarData(unsoldCar);
                console.log("Car found ");
            } else {
                console.log("Car not found or already sold.");
            }
        } catch (error) {
            console.log('Error fetching cars:', error);
        }
    };

    fetchCars();
}, []); // Dependency array is empty, effect runs once when component mounts






  const filePathsString = JSON.stringify(carData.carPhotos);

  const trimmedFilePathsArray = [];
  //Check if filePathsString is a string before splitting
  if (typeof filePathsString === 'string') {
  //     Split the string into an array of file paths
       const filePathsArray = filePathsString.split(',');
    
      // Trim each file path to remove leading and trailing whitespace
      
      filePathsArray.forEach(filePath => {
          const trimmedFilePath = filePath.trim();
          const parts = trimmedFilePath.split('\\');
          const filename = parts[parts.length - 1];

          trimmedFilePathsArray.push(filename); // Store the trimmed file path in the array
      });
  
      
      // Log the resulting array of trimmed file paths
      
    
  } else {
  }

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
      <HeaderNav />
      <HeaderSearch />
      <br />
      <HeaderFilters />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="inner-container">
            <div className="main-image-container">
              <img
                className="main-image"
                src={`http://localhost:3000/uploads/car_photos/${trimmedFilePathsArray[currentImageIndex]}`}
                alt={`${carData.make} ${carData.model}`}
                onClick={handleImageClick}
              />
              {showImageOverlay && (
                <div className="image-overlay show" onClick={handleNextImage}>
                  <img
                    className="enlarged-image"
                    src={`http://localhost:3000/uploads/car_photos/${trimmedFilePathsArray[currentImageIndex]}`}
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
                {trimmedFilePathsArray.map((image, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${
                      index === currentImageIndex ? 'active' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={`http://localhost:3000/uploads/car_photos/${trimmedFilePathsArray[index]}`} alt={`Car Image ${index + 1}`} />
                  </div>
                ))}
                <div className="image-count">+{trimmedFilePathsArray.length - 1}</div>
              </div>
            </div>
            <div className="details-container">
              <div className="price-container">
                <p>Price ${carData.price}</p>
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
                <h2> {carData.make} {carData.model} {carData.year}</h2>
                <ul>
                  <li>Suburb: {carData.suburb}</li>
                  <li>Odometer: {carData.odometer}</li>
                  <li>Transmission: {carData.transmission}</li>
                  <li>Engine Type: {carData.engineType}</li>
                  <li>Fuel Type: {carData.fuelType}</li>
                  <li>Body Type: {carData.bodyType}</li>
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
