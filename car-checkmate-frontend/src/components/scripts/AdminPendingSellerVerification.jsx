import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';

const AdminPendingSellerVerification = () => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/pending-verifications');
        const responseData = await response.json();
        if (responseData.status) {
          setPendingVerifications(responseData.data);
        } else {
          console.error('Error fetching data:', responseData.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup code here if needed
    };
  }, []);

  useEffect(() => {
    if (pendingVerifications.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: false,
        pageLength: 10,
      });
    }
  }, [pendingVerifications]);

  const paginate = (pageNumber) => {
    $(tableRef.current).DataTable().page(pageNumber - 1).draw('page');
  };

  return (
    <div className="admin-user-container">
      <h2>Seller Verifications Requests</h2>
      <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Driver License Number</th>
            <th>State</th>
            <th>License Expiry</th>
            <th>Card Number</th>
            <th>Front Image</th>
            <th>Back Image</th>
          </tr>
        </thead>
        <tbody>
          {pendingVerifications.map((verification, index) => (
            <tr key={index}>
              <td>{verification.user.email}</td>
              <td>{verification.driverLicenseNumber}</td>
              <td>{verification.state}</td>
              <td>{verification.licenseExpiry}</td>
              <td>{verification.cardNumber}</td>
              <td><img src={verification.frontImage} alt="Front Image" /></td>
              <td><img src={verification.backImage} alt="Back Image" /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(pendingVerifications.length / 10)).keys()].map((pageNumber) => (
          <button key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)}>
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminPendingSellerVerification;
