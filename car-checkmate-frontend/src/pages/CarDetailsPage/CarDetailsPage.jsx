// src/pages/CarDetailsPage/CarDetailsPage.jsx
import React from 'react';
import UploadCarDetails from '../../components/UploadCarDetails/UploadCarDetails';
import FetchCarDetails from '../../components/FetchCarDetails/FetchCarDetails';

const CarDetailsPage = () => {
  return (
    <div>
      <h2>Upload Car Details</h2>
      <UploadCarDetails />
      <h2>Fetch Car Details</h2>
      <FetchCarDetails />
    </div>
  );
};

export default CarDetailsPage;