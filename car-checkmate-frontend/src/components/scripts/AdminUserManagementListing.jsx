import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/AdminListing.css';

const UserListing = ({ user }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="user-listing-container">
      <p>User ID: {user.user_id}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Email: {user.email}</p>
      <p>Mobile Number: {user.mobileNumber}</p>
      {/* <p>User Type: {user.userType}</p> */}
      {/* Add more user details as needed */}
      <button onClick={openModal}>View Details</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
        contentLabel="User Details Modal"
      >
        <div className="modal-content">
          <h2>User Details</h2>
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile Number:</strong> {user.mobileNumber}</p>
          {/* <p><strong>User Type:</strong> {user.userType}</p> */}
          {/* Add more user details as needed */}
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default UserListing;
