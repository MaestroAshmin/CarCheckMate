import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import $ from 'jquery';
import 'datatables.net-bs4';
import PDFViewerModal from './PDFViewerModal'; // Import the modal component

const AdminPendingMechanicVerification = () => {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [selectedDocumentPath, setSelectedDocumentPath] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/pending-mechanic-verifications');
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pendingVerifications.length > 0 && tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: true,
        pageLength: 10,
      });
    }
  }, [pendingVerifications]);

  const handleVerify = async (verificationId) => {
    try {
      const response = await fetch(`http://localhost:3000/mechanic-verification/acceptVerificationRequest/${verificationId}`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error('Failed to accept mechanic verification request');
      }
  
      const data = await response.json();
      alert(data.msg);
      fetchData();
    } catch (error) {
      console.error("Error while accepting mechanic verification request:", error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const openModal = (documentPath) => {
    setSelectedDocumentPath(documentPath);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="admin-user-container">
      <h2>Seller Verifications Requests</h2>
      <table ref={tableRef} className="table table-striped table-bordered" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>User</th>
            <th>License Number</th>
            <th>License Expiry</th>
            <th>License Document</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingVerifications.map((verification, index) => (
            <tr key={index}>
              <td>{verification.user.email}</td>
              <td>{verification.licenseNumber}</td>
              <td>{new Date(verification.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
              <td>
                <button onClick={() => openModal(verification.documentPath)}>View Document</button>
              </td>
              <td>
                {verification.verificationStatus ? (
                  <span>Verified</span>
                ) : (
                  <button onClick={() => handleVerify(verification._id)}>Accept</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PDFViewerModal isOpen={isModalOpen} onClose={closeModal} documentPath={selectedDocumentPath} />
    </div>
  );
};

export default AdminPendingMechanicVerification;
