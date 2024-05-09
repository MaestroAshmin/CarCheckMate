// src/components/scripts/AdminListingManagement.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/carlist.css';

const AdminListingManagement = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars/available-cars');
        const unsoldCars = response.data.map(car => ({
          car_id: car._id,
          title: car.title,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price
        }));

        setListings(unsoldCars);
      } catch (error) {
        console.log('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="admin-listing-container">
      <h2>Listing Management</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Price</th>
            <th>Car ID</th>
          </tr>
        </thead>
        <tbody>
          {listings.map(listing => (
            <tr key={listing.car_id}>
              <td>{listing.title}</td>
              <td>{listing.make}</td>
              <td>{listing.model}</td>
              <td>{listing.year}</td>
              <td>${listing.price}</td>
              <td>{listing.car_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminListingManagement;