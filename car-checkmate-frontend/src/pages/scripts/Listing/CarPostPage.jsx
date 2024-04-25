import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/main.css';
import '../../styles/content.css';
import HeaderNav from '../../../components/scripts/HeaderNav';
import HeaderSearch from '../../../components/scripts/HeaderSearch';
import HeaderFilters from '../../../components/scripts/HeaderFilters';
import Footer from '../../../components/scripts/footer';

export default function CarPostPage() {
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

  const handleChange = (e) => {
    if (e.target.name === 'carPhotos') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handlePostCarData = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await axios.post('http://localhost:3000/cars/upload-car-details', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Car data posted:', response.data);
    } catch (error) {
      console.error('Error posting car data:', error);
    }
  };

  return (
    <div>
      <HeaderNav />
      <HeaderSearch />
      <br />
      <HeaderFilters />
      <div>
      <h2>List a Car for Sale</h2>
      {/* Add form fields for each property */}
      <input
        type="text"
        name="carID"
        placeholder="Car ID"
        value={formData.carID}
        onChange={handleChange}
      />
      {/* Add more input fields for other properties */}
      <input
        type="file"
        name="carPhotos"
        onChange={handleChange}
      />
      <button onClick={handlePostCarData}>List Car</button>
      </div>
      <br />
      <Footer />
    </div>
  );
}