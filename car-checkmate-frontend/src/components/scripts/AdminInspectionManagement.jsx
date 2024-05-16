import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';

const AdminInspectionsManagement = ({ currentPage, setCurrentPage }) => {
  const [inspections, setInspections] = useState([]);
  const tableRef = useRef(null);

  const fetchInspections = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/get-inspections');
      const responseData = await response.json();
      const inspections = responseData.data;
      const inspectionsData = inspections.map(inspection => ({
        ...inspection,
        inspectionDate: new Date(inspection.inspectionDate) // Convert inspectionDate to Date object
      }));
      
      // Sort inspections by inspectionDate in descending order
      inspectionsData.sort((a, b) => new Date(b.inspectionDate) - new Date(a.inspectionDate));

      setInspections(inspectionsData);
      console.log(inspections);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInspections();
    console.log(inspections);
  }, []);

  useEffect(() => {
    if (inspections.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: false,
        pageLength: 10,
        order: [[0, 'desc']] // Sort by the first column (Inspection Date) in descending order
      });
    }
  }, [inspections]);

  const paginate = (pageNumber) => {
    $(tableRef.current).DataTable().page(pageNumber - 1).draw('page');
  };

  return (
    <div className="admin-listing-container">
      <h2>Inspections Management</h2>
      <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Inspection Date</th>
            <th>Inspection Time</th>
            <th>Car Title</th>
            <th>Seller Name</th>
            <th>Buyer Name</th>
            <th>Mechanic ID</th>
            <th>Seller Accepted Inspection Request</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inspections.map((inspection, index) => (
            <tr key={index}>
              <td>{new Date(inspection.inspectionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
              <td>{inspection.inspectionTime}</td>
              <td>{inspection.car_id?.title}</td>
              <td>{inspection.seller_id?.firstName} {inspection.seller_id?.lastName}</td>
              <td>{inspection.buyer_id?.firstName} {inspection.buyer?.lastName}</td>
              <td>{inspection.mechanic_id?.firstName} {inspection.mechanic_id?.lastName}</td>
              <td>{inspection.sellerAcceptedInspectionRequest ? 'Yes' : 'No'}</td>
              <td>{inspection.inspectionStatus ? 'Completed' : 'Pending'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {[...Array(Math.ceil(inspections.length / 10)).keys()].map((pageNumber) => (
          <button key={pageNumber + 1} onClick={() => paginate(pageNumber + 1)}>
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminInspectionsManagement;