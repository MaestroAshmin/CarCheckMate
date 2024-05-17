import React, { useEffect, useRef, useState } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import axios from 'axios';

const AdminMechanicManagement = () => {
  const [mechanicManagement, setMechanicManagement] = useState([]);
  const tableRef = useRef(null);

  const fetchMechanicManagement = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/get-users');
      const mechanicData = response.data.data
          .filter(user => user.mechanic)
          .map(mechanic => ({
            mechanic_id: mechanic._id,
            firstName: mechanic.firstName,
            lastName: mechanic.lastName,
            email: mechanic.email,
            mobileNumber: mechanic.mobileNumber,
          }));
      
      setMechanicManagement(mechanicData);
    } catch (error) {
      console.log('Error fetching Mechanic List:', error);
    }
  };

  useEffect(() => {
    fetchMechanicManagement();
  }, []);

  useEffect(() => {
    if (mechanicManagement.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: false,
        pageLength: 10,
      });
    }
  }, [mechanicManagement]);

  const paginate = (pageNumber) => {
    $(tableRef.current).DataTable().page(pageNumber - 1).draw('page');
  };

  return (
    <div className="user-listing-container">
      <h2>Mechanic Management</h2>
      <div className="ctr-listing-page">
        <div>
          <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Mechanic ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th> 
                <th>Mobile</th>                               
              </tr>
            </thead>
            <tbody>
              {mechanicManagement.map(mechanic => (
                <tr key={mechanic.mechanic_id}>
                  <td>{mechanic.mechanic_id}</td>
                  <td>{mechanic.firstName}</td>
                  <td>{mechanic.lastName}</td>
                  <td>{mechanic.email}</td> 
                  <td>{mechanic.mobileNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {[...Array(Math.ceil(mechanicManagement.length / 10)).keys()].map((pageNumber) => (
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

export default AdminMechanicManagement;
