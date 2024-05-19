import { useState, useEffect } from "react";
import EmailSellerPopup from "./EmailSellerPopup";
import BookMechanicPopup from "./BookMechanicPopup";
import CancelPopup from "./CancelPopup";

function BuyerInspection() {
  const [upcomingInspections, setUpcomingInspections] = useState([]);
  const [showEmailSellerPopup, setShowEmailSellerPopup] = useState(false);
  const [showBookMechanicPopup, setShowBookMechanicPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const inspectionsPerPage = 5;

  const openEmailSellerPopup = (id) => {
    setShowEmailSellerPopup(id);
  };

  const openBookMechanicPopup = (carId) => {
    setShowBookMechanicPopup(carId);
  };

  const openCancelPopup = (inspection) => {
    setShowCancelPopup(inspection);
  };

  const fetchInspections = async (endpoint, setStateFunction) => {
    try {
      const userDataFromLocalStorage = localStorage.getItem("user");
      const userData = JSON.parse(userDataFromLocalStorage);
      const userId = userData._id;
      const response = await fetch(
        `http://localhost:3000/inspections/${endpoint}/${userId}`
      );
      const data = await response.json();
      setStateFunction(data.inspectionsWithCarDetails || []);
    } catch (error) {
      console.error(`Error fetching ${endpoint} inspections:`, error);
    }
  };

  const bookInspection = async (carId, inspectionDate, inspectionTime) => {
    try {
      const userDataFromLocalStorage = localStorage.getItem("user");
      const userData = JSON.parse(userDataFromLocalStorage);
      const buyerId = userData._id;

      await fetch("http://localhost:3000/inspections/inspection-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buyer_id: buyerId,
          car_id: carId,
          inspectionDate: inspectionDate,
          inspectionTime: inspectionTime,
        }),
      });

      fetchInspections("upcoming-buyer", setUpcomingInspections);
    } catch (error) {
      console.error("Error booking inspection:", error);
    }
  };

  function formatDateString(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  useEffect(() => {
    fetchInspections("upcoming-buyer", setUpcomingInspections);
  }, []);

  const indexOfLastInspection = currentPage * inspectionsPerPage;
  const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
  const currentInspections = upcomingInspections.slice(indexOfFirstInspection, indexOfLastInspection);

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

      {currentInspections.length === 0 ? (
        <p className="ctr-schedule-buyer-no-details">No upcoming inspections</p>
      ) : (
        currentInspections.map((inspection, index) => (
          <div key={index} className="ctr-schedule">
            <div className="ctr-schedule-buyer-detail">
              {inspection.car ? (
                <>
                  <h3>
                    Car: <span>{inspection.car.make}</span>{" "}
                    <span>{inspection.car.model}</span>
                  </h3>
                  <p>
                    Date:{" "}
                    <span>{formatDateString(inspection.inspectionDate)}</span>
                  </p>
                  <p>
                    Time: <span>{inspection.inspectionTime}</span>
                  </p>

                  {inspection.mechanic_id ? (
                    <p>
                      Mechanic Status:{" "}
                      <span>
                        Your Inspection has been accepted by the mechanic
                      </span>
                    </p>
                  ) : (
                    <p>No Mechanic has accepted the inspection</p>
                  )}
                </>
              ) : (
                <h3>No car details available</h3>
              )}
            </div>
            <div className="ctr-schedule-option">
              {inspection.car ? (
                <>
                  <img src={inspection.car.carPhotos[0]} alt={`Car Image`} />
                </>
              ) : (
                []
              )}
              <div className="ctr-schedule-option-s">
                <button onClick={() => openEmailSellerPopup(inspection._id)}>
                  Email Seller
                </button>
                <button onClick={() => openCancelPopup(inspection)}>
                  Cancel booking
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <div className="pagination">
        {Array.from(
          { length: Math.ceil(upcomingInspections.length / inspectionsPerPage) },
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

export default BuyerInspection;
