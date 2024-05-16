import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';

const AdminUserManagement = ({users}) => {
  const tableRef = useRef(null);

  useEffect(() => {
    $(tableRef.current).DataTable({
      data: users,
      columns: [
        { data: 'user_id' },
        { data: 'firstName' },
        { data: 'lastName' },
        { data: 'email' },
        { data: 'mobileNumber' },
        { data: 'userType' },
        { data: 'sellerVerified' },
        { data: 'mechanicVerified' },
        { data: 'emailVerified' },
        {
          data: null,
          render: function (data, type, row) {
            return `<button class="btn btn-primary btn-sm view-details">View Details</button>`;
          },
        },
      ],
    });

  
    return () => {
      $(tableRef.current).DataTable().destroy(true);
    };    
  }, [users]);

  return (
    <div className="admin-user-container">
      <h2>User Management</h2>
      <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>User Type</th>
            <th>Seller Verified</th>
            <th>Mechanic Verified</th>
            <th>Email Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default AdminUserManagement;