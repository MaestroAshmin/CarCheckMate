// src/pages/scripts/Listing/Listing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Listing.css';

export default function Listing({ car }) {
  const navigate = useNavigate();


  const filePathsString = JSON.stringify(car.carPhotos);
  console.log(`Type of filePathsString: ${typeof filePathsString}, Value:`, filePathsString);
    const trimmedFilePathsArray = [];
  // Check if filePathsString is a string before splitting
  if (typeof filePathsString === 'string') {
      // Split the string into an array of file paths
      const filePathsArray = filePathsString.split(',');
    
      // Trim each file path to remove leading and trailing whitespace
      
      filePathsArray.forEach(filePath => {
          const trimmedFilePath = filePath.trim();
          const parts = trimmedFilePath.split('\\');
          const filename = parts[parts.length - 1];
         // console.log('Filename:', filename);
          trimmedFilePathsArray.push(filename); // Store the trimmed file path in the array
      });
  
      // Log the resulting array of trimmed file paths
      
    
  } else {
      //console.log(`filePathsString is not a string. It is of type: ${typeof filePathsString}`);
  }
  //console.log('Trimmed file paths:', trimmedFilePathsArray[0]);

  console.log(trimmedFilePathsArray[0])

  const handleCarClick = () => {
    // Navigate to the CarInfoPage when a car is clicked
    navigate(`/car/${car.id}`);
  };

  return (
    <div className="listing-container" onClick={handleCarClick}>
      <div className="image-container">
      <img src={`http://localhost:3000/uploads/car_photos/${trimmedFilePathsArray[0]}`} alt={car.make} className="listing-image" />
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