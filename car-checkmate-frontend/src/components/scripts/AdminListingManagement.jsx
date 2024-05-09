import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Listing from '../scripts/AdminListingManagementListing';
import '../styles/carlist.css';

const AdminListingManagement = ({ currentPage, setCurrentPage }) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cars/available-cars?page=${currentPage}&limit=6`);
        const unsoldCars = response.data.map(car => ({
            car_id:car._id,
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

        setListings(unsoldCars);
      } catch (error) {
        console.log('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-listing-container">
      <h2>Listing Management</h2>
      <div className="ctr-listing-page">
        <div className="sub-ctr-listing-page">
          <div className="ctr-listing">
            {listings.map(listing => (
              <Listing
                key={listing.car_id}
                car={listing}
                handleCarClick={() => {}}
              />
            ))}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(listings.length / 12)).keys()].map((pageNumber) => (
              <button key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)}>
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminListingManagement;
