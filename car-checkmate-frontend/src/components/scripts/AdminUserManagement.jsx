import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import axios from 'axios';

const AdminSellerManagement = () => {
  const [sellerManagement, setSellerManagement] = useState([]);
  const tableRef = useRef(null);

  const fetchsellerManagement = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/get-users');
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
      setsellerManagement(unsoldCars);
    } catch (error) {
      console.log('Error fetching Seller List:', error);
    }
  };

  useEffect(() => {
    fetchsellerManagement();
  }, []);

  useEffect(() => {
    if (sellerManagement.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: false,
        pageLength: 10,
      });
    }
  }, [sellerManagement]);

  const paginate = (pageNumber) => {
    $(tableRef.current).DataTable().page(pageNumber - 1).draw('page');
  };

  return (
    <div className="user-listing-container">
      <h2>Seller Management</h2>
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
              {sellerManagement.map(sellerManagement => (
                <tr key={sellerManagement.car_id}>
                  <td>{sellerManagement.make}</td>
                  <td>{sellerManagement.model}</td>
                  <td>${sellerManagement.price}</td> 
                  <td>{sellerManagement.year}</td>                                   
                  <td>{sellerManagement.registrationNo}</td>
                  <td><img src ={sellerManagement.carPhotos[0]}></img></td>
                  <td><button className="btn btn-primary btn-sm view-details">View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
        {[...Array(Math.ceil(sellerManagement.length / 10)).keys()].map((pageNumber) => (
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

export default AdminsellerManagementManagement;
