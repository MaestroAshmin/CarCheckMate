import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/main.css";
import "../../styles/content.css";
import "../../styles/CarInfoPage.css";
import HeaderNav from "../../../components/scripts/HeaderNav";
import HeaderSearch from "../../../components/scripts/HeaderSearch";
import Footer from "../../../components/scripts/footer";
import BookSellerPopup from "../../../components/scripts/BookSellerPopup";
import BookMechanicPopup from "../../../components/scripts/BookMechanicPopup";

export default function CarInfoPage() {
  const { _id } = useParams(); // Use _id instead of carId

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);

  const [showBookSellerPopup, setShowBookSellerPopup] = useState(false);
  const [showBookMechanicPopup, setShowBookMechanicPopup] = useState(false);

  const openBookSellerPopup = () => {
    setShowBookSellerPopup(true);
  };

  const openBookMechanicPopup = () => {
    setShowBookMechanicPopup(true);
  };
  useEffect(() => {
    console.log("cardata", carData);
  }, [carData]);
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cars/car/${_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch car data");
        }
        const data = await response.json();
        setCarData(data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching car data:", error);
        setIsLoading(false); // Stop loading state on error
      }
    };

    fetchCarData();
  }, [_id]);
  console.log(carData);
  //   const filePathsString = JSON.stringify(carData.carPhotos);

  //   const trimmedFilePathsArray = [];
  //   //Check if filePathsString is a string before splitting
  //   if (typeof filePathsString === 'string') {
  //   //     Split the string into an array of file paths
  //        const filePathsArray = filePathsString.split(',');

  //       // Trim each file path to remove leading and trailing whitespace

  //       filePathsArray.forEach(filePath => {
  //           const trimmedFilePath = filePath.trim();
  //           const parts = trimmedFilePath.split('\\');
  //           const filename = parts[parts.length - 1];

  //           trimmedFilePathsArray.push(filename); // Store the trimmed file path in the array
  //       });

  //       // Log the resulting array of trimmed file paths
  //   } else {
  //   }
  // Ensure carPhotos is an array
  const carPhotosArray = Array.isArray(carData.carPhotos)
    ? carData.carPhotos
    : [];

  // Trim each file path to remove leading and trailing whitespace
  const trimmedFilePathsArray = carPhotosArray.map((filePath) => {
    const trimmedFilePath = filePath.trim();
    const parts = trimmedFilePath.split("\\");
    return parts[parts.length - 1];
  });
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carData.carPhotos.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % carData.carPhotos.length
    );
  };

  const handleImageClick = () => {
    setShowImageOverlay(true);
  };

  const handleCloseImageOverlay = () => {
    setShowImageOverlay(false);
  };

  return (
    <div className="ctr-main">
      <BookSellerPopup
        showBookSellerPopup={showBookSellerPopup}
        setShowBookSellerPopup={setShowBookSellerPopup}
      />

      <BookMechanicPopup
        showBookMechanicPopup={showBookMechanicPopup}
        setShowBookMechanicPopup={setShowBookMechanicPopup}
      />

      <div className="ctr-sub-content">
        <HeaderNav />
        <HeaderSearch />
        <div className="ctr-car-detail">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <h2>
                {" "}
                {carData.make} {carData.model} {carData.year}
              </h2>
              <div className="inner-container">
                <div className="main-image-container">
                  <img
                    className="main-image"
                    src={trimmedFilePathsArray[currentImageIndex]}
                    alt={`${carData.make} ${carData.model}`}
                    onClick={handleImageClick}
                  />
                  {showImageOverlay && (
                    <div
                      className="image-overlay show"
                      onClick={handleNextImage}
                    >
                      <img
                        className="enlarged-image"
                        src={trimmedFilePathsArray[currentImageIndex]}
                        alt={`${carData.make} ${carData.model}`}
                      />
                      <div className="image-controls">
                        <button onClick={handlePrevImage}>&#8249;</button>
                        <button onClick={handleNextImage}>&#8250;</button>
                      </div>
                      <button
                        className="close-button"
                        onClick={handleCloseImageOverlay}
                      >
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
                          index === currentImageIndex ? "active" : ""
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img
                          src={trimmedFilePathsArray[index]}
                          alt={`Car Image ${index + 1}`}
                        />
                      </div>
                    ))}
                    <div className="image-count">
                      +{trimmedFilePathsArray.length - 1}
                    </div>
                  </div>
                </div>
                <div className="details-container">
                  <div className="price-container">
                    <p>${carData.price}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <div className="tab-content">
                  <div className="car-details">
                    <h2>
                      {" "}
                      {carData.make} {carData.model} {carData.year}
                    </h2>
                    <ul>
                      <li>
                        <strong>Suburb:</strong> {carData.suburb}
                      </li>
                      <li>
                        <strong>Odometer:</strong> {carData.odometer}
                      </li>
                      <li>
                        <strong>Transmission:</strong> {carData.transmission}
                      </li>
                      <li>
                        <strong>Engine Type:</strong> {carData.engineType}
                      </li>
                      <li>
                        <strong>Fuel Type:</strong> {carData.fuelType}
                      </li>
                      <li>
                        <strong>Body Type:</strong> {carData.bodyType}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
