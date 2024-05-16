import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const tableRef = useRef(null);
  const dataTable = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/get-users');
        const userData = response.data.data.map(user => ({
          user_id: user._id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          mobileNumber: user.mobileNumber,
          userType: user.buyer ? 'Buyer' : user.seller ? 'Seller' : user.mechanic ? 'Mechanic' : 'Unknown',
          sellerVerified: user.sellerVerified,
          mechanicVerified: user.mechanicVerified,
          emailVerified: user.emailVerified,
        }));
        setUsers(userData);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (tableRef.current && !dataTable.current) {
      dataTable.current = $(tableRef.current).DataTable({
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
    }
  }, [users]);

  useEffect(() => {
    return () => {
      if (dataTable.current) {
        dataTable.current.destroy(true);
      }
    };
  }, []);

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