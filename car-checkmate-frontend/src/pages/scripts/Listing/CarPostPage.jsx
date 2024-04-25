// CarPostPage.jsx
import React from 'react';
import axios from 'axios';

export default function CarPostPage() {
  const handlePostCarData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/cars/upload-car-details', {
        carID: 1,
        make: 'Toyota',
        model: 'Corolla',
        suburb: 'Hawthorn',
        postcode: 3011,
        state: 'VIC',
        color: 'Black',
        price: 60000,
        odometer: 120000,
        transmission: 'Automatic',
        year: 2010,
        engineType: 'V6',
        fuelType: 'Petrol',
        bodyType: 'Sedan'
      });
      console.log('Car data posted:', response.data);
    } catch (error) {
      console.error('Error posting car data:', error);
    }
  };

  return (
    <div>
      <h2>List a Car for Sale</h2>
      <button onClick={handlePostCarData}>List Car</button>
    </div>
  );
}
