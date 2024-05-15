import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery'; // Import jQuery
import 'datatables.net-bs4'; // DataTables JS
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'; // DataTables CSS

import '../styles/carlist.css';

const AdminListingManagement = () => {
  const [listings, setListings] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    $(tableRef.current).DataTable({
      paging: false, // Disable pagination
    }); // Initialize DataTables
    return () => {
      $(tableRef.current).DataTable().destroy(true); // Destroy DataTables on component unmount
    };
  }, []); // Run only once on component mount

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars/available-cars');
        const unsoldCars = response.data.map(car => ({
          car_id: car._id,
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          registrationNo: car.registrationNo,
          bodyType: car.bodyType,
          color: car.color,
          engineType: car.engineType,
          fuelType: car.fuelType,
          odometer: car.odometer,
          state: car.state,
          streetName: car.streetName,
          suburb: car.suburb,
          postcode: car.postcode,
          transmission: car.transmission,
          hasBeenSold: car.hasBeenSold,
          carPhotos: car.carPhotos // Split the photo string into an array
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
      <div className="ctr-listing-page">
        <div className="sub-ctr-listing-page">
          <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Car ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Price</th>
                <th>Registration No</th>
                <th>Body Type</th>
                <th>Color</th>
                <th>Engine Type</th>
                <th>Fuel Type</th>
                <th>Odometer</th>
                <th>State</th>
                <th>Street Name</th>
                <th>Suburb</th>
                <th>Postcode</th>
                <th>Transmission</th>
                <th>Has Been Sold</th>
                <th>Car Photos</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing.car_id}>
                  <td>{listing.car_id}</td>
                  <td>{listing.make}</td>
                  <td>{listing.model}</td>
                  <td>{listing.year}</td>
                  <td>{listing.price}</td>
                  <td>{listing.registrationNo}</td>
                  <td>{listing.bodyType}</td>
                  <td>{listing.color}</td>
                  <td>{listing.engineType}</td>
                  <td>{listing.fuelType}</td>
                  <td>{listing.odometer}</td>
                  <td>{listing.state}</td>
                  <td>{listing.streetName}</td>
                  <td>{listing.suburb}</td>
                  <td>{listing.postcode}</td>
                  <td>{listing.transmission}</td>
                  <td>{listing.hasBeenSold ? 'Yes' : 'No'}</td>
                  <td>{listing.carPhotos}</td>
                  <td><button className="btn btn-primary btn-sm view-details">View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminListingManagement;
