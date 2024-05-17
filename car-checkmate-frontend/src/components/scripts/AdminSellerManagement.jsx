import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import axios from 'axios';

const AdminSellerManagement = () => {
  const [sellerManagement, setSellerManagement] = useState([]);
  const tableRef = useRef(null);

  const fetchSellerManagement = async () => {
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
      
      setSellerManagement(sellerData);
    } catch (error) {
      console.log('Error fetching Seller List:', error);
    }
  };

  useEffect(() => {
    fetchSellerManagement();
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
                <th>Seller ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th> 
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {sellerManagement.map(sellerManagement => (
                <tr key={sellerManagement.seller_id}>
                  <td>{sellerManagement.seller_id}</td>
                  <td>{sellerManagement.firstName}</td>
                  <td>{sellerManagement.lastName}</td>
                  <td>{sellerManagement.email}</td> 
                  <td>{sellerManagement.mobileNumber}</td> 
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

export default AdminSellerManagement;
