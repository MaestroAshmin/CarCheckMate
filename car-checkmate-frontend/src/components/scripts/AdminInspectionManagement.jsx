import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InspectionListing from './AdminInspectionManagementListing';
import '../styles/carlist.css';

const AdminInspectionsManagement = ({ currentPage, setCurrentPage }) => {
  const [inspections, setInspections] = useState([]);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/inspections?page=${currentPage}&limit=12`);
        const inspectionsData = response.data.map(inspection => ({
          inspection_id: inspection._id,
          inspectionDate: inspection.inspectionDate,
          inspectionTime: inspection.inspectionTime,
          car_id: inspection.car_id,
          seller_id: inspection.seller.id,
          buyer_id: inspection.buyer_id,
          mechanic_id: inspection.mechanic_id,         
          sellerAcceptedInspectionRequest: inspection.sellerAcceptedInspectionRequest,         
          inspectionStatus: inspection.inspectionStatus
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
              <InspectionListing
                key={inspection.inspection_id}
                inspection={inspection}
              />
            ))}
          </div>
          <div className="pagination">
            {[...Array(Math.ceil(inspections.length / 12)).keys()].map((pageNumber) => (
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
