import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import axios from 'axios';

const AdminBuyerManagement = () => {
  const [buyerManagement, setBuyerManagement] = useState([]);
  const tableRef = useRef(null);

  const fetchBuyerManagement = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/get-users');
      const buyerData = response.data.data
          .filter(user => user.buyer)
          .map(buyer => ({
            buyer_id: buyer._id,
            firstName: buyer.firstName,
            lastName: buyer.lastName,
            email: buyer.email,
            mobileNumber: buyer.mobileNumber,
          }));
      
      setBuyerManagement(buyerData);
    } catch (error) {
      console.log('Error fetching Buyer List:', error);
    }
  };

  useEffect(() => {
    fetchBuyerManagement();
  }, []);

  useEffect(() => {
    if (buyerManagement.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: false,
        pageLength: 10,
      });
    }
  }, [buyerManagement]);

  const paginate = (pageNumber) => {
    $(tableRef.current).DataTable().page(pageNumber - 1).draw('page');
  };

  return (
    <div className="user-listing-container">
      <h2>Buyer Management</h2>
      <div className="ctr-listing-page">
        <div>
          <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th> 
                <th>Mobile</th>                               
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {buyerManagement.map(buyer => (
                <tr key={buyer.buyer_id}>
                  <td>{buyer.firstName}</td>
                  <td>{buyer.lastName}</td>
                  <td>{buyer.email}</td> 
                  <td>{buyer.mobileNumber}</td>                                   
                  <td><button className="btn btn-primary btn-sm view-details">View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(Math.ceil(buyerManagement.length / 10)).keys()].map((pageNumber) => (
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

export default AdminBuyerManagement;
