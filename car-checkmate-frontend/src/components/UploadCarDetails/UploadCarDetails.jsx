// src/components/UploadCarDetails/UploadCarDetails.jsx
import React, { useState } from 'react';
import axios from 'axios';

// Create the Axios instance with the base URL
const axios = axios.create({
  baseURL: 'http://localhost:10533/api',
});

const UploadCarDetails = () => {
  const [formData, setFormData] = useState({
    carID: '',
    make: '',
    model: '',
    suburb: '',
    postcode: '',
    state: '',
    color: '',
    price: '',
    odometer: '',
    transmission: '',
    year: '',
    engineType: '',
    fuelType: '',
    bodyType: '',
    carPhotos: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'carPhotos') {
          // Append each file individually
          for (const file of formData[key]) {
            formDataToSend.append('carPhotos', file);
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
      await axios.post('/cars/upload-car-details', formDataToSend);
      console.log('Car details uploaded successfully');
    } catch (error) {
      setError('Error uploading car details');
      console.error('Error uploading car details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <input
        type="text"
        name="carID"
        value={formData.carID}
        onChange={handleChange}
        placeholder="Car ID"
      />
      <input
        type="text"
        name="make"
        value={formData.make}
        onChange={handleChange}
        placeholder="Make"
      />
      <input
        type="text"
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Model"
      />
      <input
        type="text"
        name="suburb"
        value={formData.suburb}
        onChange={handleChange}
        placeholder="Suburb"
      />
      <input
        type="text"
        name="postcode"
        value={formData.postcode}
        onChange={handleChange}
        placeholder="Postcode"
      />
      <input
        type="text"
        name="state"
        value={formData.state}
        onChange={handleChange}
        placeholder="State"
      />
      <input
        type="text"
        name="color"
        value={formData.color}
        onChange={handleChange}
        placeholder="Color"
      />
      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="odometer"
        value={formData.odometer}
        onChange={handleChange}
        placeholder="Odometer"
      />
      <input
        type="text"
        name="transmission"
        value={formData.transmission}
        onChange={handleChange}
        placeholder="Transmission"
      />
      <input
        type="text"
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
      />
      <input
        type="text"
        name="engineType"
        value={formData.engineType}
        onChange={handleChange}
        placeholder="EngineType"
      />
      <input
        type="text"
        name="fuelType"
        value={formData.fuelType}
        onChange={handleChange}
        placeholder="FuelType"
      />
      <input
        type="text"
        name="bodyType"
        value={formData.bodyType}
        onChange={handleChange}
        placeholder="BodyType"
      />
      <input
        type="file"
        name="carPhotos"
        onChange={handleChange}
        multiple
      />
      <button type="submit">Upload Car Details</button>
    </form>
  );
};

export default UploadCarDetails;