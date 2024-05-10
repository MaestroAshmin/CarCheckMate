// AdminInspectionManagementListing.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
// import '../styles/AdminInspectionManagementListing.css';

const InspectionListing = ({ inspection }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleDetailsClick = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="inspection-listing-container">
      <div className="inspection-details-button">
        <button onClick={handleDetailsClick}>View Details</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
        contentLabel="Inspection Details Modal"
      >
        <div className="modal-content">
          <h2>Inspection Details</h2>
          <p><strong>Inspection ID:</strong> {inspection.inspection_id}</p>
          <p><strong>Inspection Date:</strong> {inspection.inspectionDate}</p>
          <p><strong>Inspection Time:</strong> {inspection.inspectionTime}</p>
          <p><strong>Car ID:</strong> {inspection.car_id}</p>
          <p><strong>Seller ID:</strong> {inspection.seller_id}</p>
          <p><strong>Buyer ID:</strong> {inspection.buyer_id}</p>
          <p><strong>Mechanic ID:</strong> {inspection.mechanic_id}</p>
          <p><strong>Seller Acceptance Stats:</strong> {inspection.sellerAcceptedInspectionRequest ? 'Accepted' : 'Unaccepted'}</p>
          <p><strong>Inspection Status:</strong> {inspection.inspectionStatus}</p>
          <div className="button-container">
            <button onClick={() => setModalIsOpen(false)}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InspectionListing;
