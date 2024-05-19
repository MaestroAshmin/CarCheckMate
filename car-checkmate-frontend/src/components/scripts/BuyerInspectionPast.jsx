import { useState, useEffect } from 'react';
import EmailSellerPopup from './EmailSellerPopup';
import BookMechanicPopup from './BookMechanicPopup';
import CancelPopup from './CancelPopup';

function BuyerInspectionPast() {
  const [pastInspections, setPastInspections] = useState([]);
  const [showEmailSellerPopup, setShowEmailSellerPopup] = useState(false);
  const [showBookMechanicPopup, setShowBookMechanicPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const inspectionsPerPage = 3;

  const openEmailSellerPopup = () => {
    setShowEmailSellerPopup(true);
  };

  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  useEffect(() => {
    const fetchInspections = async (endpoint, setStateFunction) => {
      try {
        const userDataFromLocalStorage = localStorage.getItem('user');
        const userData = JSON.parse(userDataFromLocalStorage);
        const userId = userData._id;
        const response = await fetch(`http://localhost:3000/inspections/${endpoint}/${userId}`);
        const data = await response.json();
        setStateFunction(data.inspectionsWithCarDetails || []);
      } catch (error) {
        console.error(`Error fetching ${endpoint} inspections:`, error);
      }
    };
    fetchInspections('past-buyer', setPastInspections);
  }, []);

  const indexOfLastInspection = currentPage * inspectionsPerPage;
  const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
  const currentInspections = pastInspections.slice(indexOfFirstInspection, indexOfLastInspection);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <EmailSellerPopup
        showEmailSellerPopup={showEmailSellerPopup}
        setShowEmailSellerPopup={setShowEmailSellerPopup}
      />

      <BookMechanicPopup
        showBookMechanicPopup={showBookMechanicPopup}
        setShowBookMechanicPopup={setShowBookMechanicPopup}
      />

      <CancelPopup
        showCancelPopup={showCancelPopup}
        setShowCancelPopup={setShowCancelPopup}
      />

      <div className="container">
        <div className="past-inspections">
          {currentInspections.length === 0 ? (
            <p className='ctr-schedule-buyer-no-details'>No past inspections</p>
          ) : (
            <div className="past-inspections-list">
              {currentInspections.map((inspection, index) => (
                <div key={index} className='ctr-schedule'>
                  <div className='ctr-schedule-buyer-detail'>
                    {inspection.car ? (
                      <>
                        <img src={inspection.car.carPhotos[0]} alt={`Car Image`} />
                        <p>Date: <span>{formatDateString(inspection.inspectionDate)}</span></p>
                        <p>Time: <span>{inspection.inspectionTime}</span></p>
                        {inspection.mechanic_id ? (
                          <p>Mechanic Status: <span>Your Inspection has been accepted by the mechanic</span></p>
                        ) : (
                          <p>No Mechanic has accepted the inspection</p>
                        )}
                        {inspection.inspectionStatus ? (
                          <p>Inspection Status: <span>Inspection is complete</span></p>
                        ) : (
                          <p>Inspection Status: <span>Inspection has not been completed yet</span></p>
                        )}
                      </>
                    ) : (
                      <p>No car details available</p>
                    )}
                  </div>
                  <div className='ctr-schedule-option'>
                    <button onClick={openEmailSellerPopup}>Email Seller</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(pastInspections.length / inspectionsPerPage) },
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default BuyerInspectionPast;