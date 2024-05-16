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
      const sellerList = response.data.map(sellerList => ({
        seller_id: sellerList.seller_id,
        firatname: sellerList.firatname,
        lastname: sellerList.lastname,
        email: sellerList.email,
        mobileNumber: sellerList.mobileNumber,
        sellerVerified: sellerList.sellerVerified,
      }));
      setSellerManagement(sellerList);
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
                <th>ID</th>
                <th>Firat Name</th>
                <th>Last Name</th> 
                <th>Email</th>                               
                <th>Mobile</th>
                <td>Verification</td>
              </tr>
            </thead>
            <tbody>
              {sellerManagement.map(sellerManagement => (
                <tr key={sellerManagement.seller_id}>
                  <td>{sellerManagement.firatname}</td>
                  <td>{sellerManagement.lastname}</td>
                  <td>{sellerManagement.email}</td> 
                  <td>{sellerManagement.mobileNumber}</td>                                   
                  <td>{sellerManagement.sellerVerified}</td>
                  {/* <td><button className="btn btn-primary btn-sm view-details">View Details</button></td> */}
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
