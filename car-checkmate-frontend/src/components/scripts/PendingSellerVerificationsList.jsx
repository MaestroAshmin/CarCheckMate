import React, { useEffect, useRef } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';

const PendingSellerVerificationList = ({ pendingVerifications }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    $(tableRef.current).DataTable({
      data: pendingVerifications,
      columns: [
        { data: 'user' },
        { data: 'driverLicenseNumber' },
        { data: 'state' },
        { data: 'licenseExpiry' },
        { data: 'cardNumber' },
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
  }, [pendingVerifications]);

  return (
    <div className="user-listing-container">
      <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>Driver License Number</th>
            <th>State</th>
            <th>License Expiry</th>
            <th>Card Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default PendingSellerVerificationList;