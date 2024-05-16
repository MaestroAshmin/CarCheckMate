import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import axios from 'axios';

const AdminSellerManagement = () => {
  const [sellers, setSellers] = useState([]);
  const tableRef = useRef(null);
  const dataTable = useRef(null);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/get-users');
        const sellerData = response.data.data
          .filter(user => user.seller && user.sellerVerified)
          .map(seller => ({
            seller_id: seller._id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            email: seller.email,
            mobileNumber: seller.mobileNumber,
            sellerVerified: seller.sellerVerified,
          }));
        setSellers(sellerData);
      } catch (error) {
        console.log('Error fetching sellers:', error);
      }
    };
    fetchSellers();
  }, []);

  useEffect(() => {
    if (tableRef.current && !dataTable.current) {
      dataTable.current = $(tableRef.current).DataTable({
        data: sellers,
        columns: [
          { data: 'seller_id' },
          { data: 'firstName' },
          { data: 'lastName' },
          { data: 'email' },
          { data: 'mobileNumber' },
          { data: 'sellerVerified' },
          {
            data: null,
            render: function (data, type, row) {
              return `<button class="btn btn-primary btn-sm view-details">View Details</button>`;
            }
          }
        ]
      });
    }
  }, [sellers]);

  useEffect(() => {
    return () => {
      if (dataTable.current) {
        dataTable.current.destroy(true);
      }
    };
  }, []);

  return (
    <div className="user-listing-container">
      <h2>Seller Management</h2>
      <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Seller Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default AdminSellerManagement;