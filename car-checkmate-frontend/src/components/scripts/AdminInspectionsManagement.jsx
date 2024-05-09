import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/carlist.css';

const AdminInspectionsManagement = ({ currentPage, setCurrentPage }) => {
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/inspections?page=${currentPage}&limit=6`);
        const inspectionsData = response.data.map(inspection => ({
          // Map inspection data to your desired format
          inspection_id: inspection._id,
          // Add other fields as needed, for example:
          // inspectionDate: inspection.inspectionDate,
          // inspectionTime: inspection.inspectionTime,
          // car_id: inspection.car_id,
        }));

        setInspections(inspectionsData);
      } catch (error) {
        console.log('Error fetching inspections:', error);
      }
    };

    fetchInspections();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="admin-listing-container">
      <h2>Inspections Management</h2>
      <div className="ctr-listing-page">
        <div className="sub-ctr-listing-page">
          <div className="ctr-listing">
            {inspections.map(inspection => (
              <div key={inspection.inspection_id} className="inspection-item">
                {/* Render inspection details here */}
                {/* For example: */}
                {/* <p>Inspection ID: {inspection.inspection_id}</p> */}
              </div>
            ))}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(inspections.length / 6)).keys()].map((pageNumber) => (
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

export default AdminInspectionsManagement;
