import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery'; 
import 'datatables.net-bs4'; 
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

const AdminListingManagement = () => {
  const [listings, setListings] = useState([]);
  const tableRef = useRef(null);

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
        carPhotos: car.carPhotos
      }));
      setListings(unsoldCars);
    } catch (error) {
      console.log('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (listings.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: false,
        pageLength: 10,
      });
    }
  }, [listings]);

  return (
    <div className="user-listing-container">
      <h2>Listing Management</h2>
      <div className="ctr-listing-page">
        <div>
          <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th>Price</th> 
                <th>Year</th>                               
                <th>Registration</th>
                <td>Image</td>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(listing => (
                <tr key={listing.car_id}>
                  <td>{listing.make}</td>
                  <td>{listing.model}</td>
                  <td>${listing.price}</td> 
                  <td>{listing.year}</td>                                   
                  <td>{listing.registrationNo}</td>
                  <td><img src ={listing.carPhotos[0]}></img></td>
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
