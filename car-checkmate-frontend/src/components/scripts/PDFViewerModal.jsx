import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        height: '90vh', // Set height to full viewport height
        width: '50%', // Set width to 100% to occupy full screen width
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Translate to center
        overflow: 'auto', // Enable scrolling if content exceeds the height
      },
  };

const PDFViewerModal = ({ isOpen, onClose, documentPath }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="PDF Viewer Modal"
      style={customStyles}
    >
      <div style={{ height: '100%' }}>
        <button onClick={onClose}>Close Modal</button>
        <embed src={documentPath} type="application/pdf" width="100%" height="100%" />
      </div>
    </Modal>
  );
};

export default PDFViewerModal;