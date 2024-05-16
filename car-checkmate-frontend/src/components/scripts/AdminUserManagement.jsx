import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import UserListing from '../scripts/AdminUserManagementListing';
import $ from 'jquery'; // Import jQuery
import 'datatables.net-bs4'; // DataTables JS
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css'; // DataTables CSS

const AdminUserManagement = ({ currentPage, setCurrentPage }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users?page=${currentPage}&limit=12`);
        const userData = response.data.map(user => ({
          user_id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          mobileNumber: user.mobileNumber,
          // Add more user type and vertification key value pairs
        }));

        setUsers(userData);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    if (users.length > 0) {
      $(tableRef.current).DataTable({
        paging: true,
        pageLength: 10,
      });
    }
  }, [users]);

  const tableRef = useRef(null);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-user-container">
      <h2>User Management</h2>
      <div className="ctr-user-page">
        <div className="sub-ctr-user-page">
          <div className="ctr-user">
            {users.map(user => (
              <UserListing
                key={user.user_id}
                user={user}
                handleUserClick={() => {}}
              />
            ))}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(users.length / 12)).keys()].map((pageNumber) => (
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

export default AdminUserManagement;