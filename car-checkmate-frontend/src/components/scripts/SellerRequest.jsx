import { useState, useEffect } from "react";
import CancelPopup from "./CancelPopup";
import ResponsePopup from "./ResponsePopup";

function SellerRequest() {
  const [pendingInspections, setPendingInspections] = useState([]);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [inspectionToCancel, setInspectionToCancel] = useState(null);
  const [showAcceptedMessage, setShowAcceptedMessage] = useState(false);
  const [showResponsePopup, setShowResponsePopup] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const openResponsePopup = (message) => {
      setResponseMessage(message);
      setShowResponsePopup(true);
  };

  const openCancelPopup = (inspectionId) => {
    setShowCancelPopup(true);
    setInspectionToCancel(inspectionId);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const inspectionsPerPage = 3;

  const indexOfLastInspection = currentPage * inspectionsPerPage;
  const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
  const currentInspections = pendingInspections.slice(
    indexOfFirstInspection,
    indexOfLastInspection
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPendingInspections = async () => {
      try {
        // Retrieve user data from local storage
        const userDataFromLocalStorage = localStorage.getItem("user");
        const userData = JSON.parse(userDataFromLocalStorage);
        const userId = userData._id;
        const response = await fetch(
          `http://localhost:3000/inspections/pending-inspections/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pending inspections");
        }
        const data = await response.json();
        setPendingInspections(data.inspectionsWithCarDetails || []);
      } catch (error) {
        console.error("Error fetching pending inspections:", error);
      }
    };

    fetchPendingInspections();
  }, []);
  const handleAccept = async (inspectionId) => {
    try {
      // Retrieve user data from local storage
      const userDataFromLocalStorage = localStorage.getItem("user");
      const userData = JSON.parse(userDataFromLocalStorage);
      const userId = userData._id;
      const response = await fetch(
        `http://localhost:3000/inspections/accept/${inspectionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to accept inspection");
      }
      {/*setShowAcceptedMessage(true);*/}

      openResponsePopup("The inspection request has been accepted!");

      const updatedResponse = await fetch(
        `http://localhost:3000/inspections/pending-inspections/${userId}`
      );
      if (!updatedResponse.ok) {
        throw new Error("Failed to fetch updated pending inspections");
      }
      const updatedData = await updatedResponse.json();
      setPendingInspections(updatedData.inspectionsWithCarDetails || []);
    } catch (error) {
      console.error("Error accepting inspection:", error);
    }
  };
  return (
    <div>
      <ResponsePopup
          message={responseMessage}
          showResponsePopup={showResponsePopup}
          setShowResponsePopup={setShowResponsePopup}
      />

      <CancelPopup
        showCancelPopup={showCancelPopup}
        setShowCancelPopup={setShowCancelPopup}
        inspectionId={inspectionToCancel} // Pass inspection id as prop
      />
      {showAcceptedMessage && <p className='align-p'>Inspection Accepted!</p>}
      {currentInspections.map((inspection, index) => (
        <div key={index} className="ctr-schedule-book">
          <div className="ctr-schedule-seller">
            <img src={inspection.car.carPhotos[0]} alt="Car" />
            <h3><span>{inspection.car.make}</span> <span>{inspection.car.model}</span></h3>
            <p>
              <span>
                {new Date(inspection.inspectionDate).toLocaleDateString()}
              </span>
              , <span>{inspection.inspectionTime}</span>
            </p>
          </div>
          <div className="ctr-schedule-option-seller-request">
            <button onClick={() => handleAccept(inspection._id)}>Accept</button>
            <button onClick={() => openCancelPopup(inspection._id)}>
              Deny
            </button>
          </div>
        </div>
      ))}

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(pendingInspections.length / inspectionsPerPage) },
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

export default SellerRequest;
