import { useState, useEffect } from "react";
import EmailBuyerPopup from "./EmailBuyerPopup";
import AddRWCPopup from "./AddRWCPopup";
import CancelPopup from "./CancelPopup";

function SellerSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [showEmailBuyerPopup, setShowEmailBuyerPopup] = useState(false);
  const [showAddRWCPopup, setShowAddRWCPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  const openEmailBuyerPopup = () => {
    setShowEmailBuyerPopup(true);
  };

  const openAddRWCPopup = () => {
    setShowAddRWCPopup(true);
  };

  const openCancelPopup = (schedule) => {
    setShowCancelPopup(schedule);
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
    const fetchSchedules = async () => {
      try {
        // Retrieve user data from local storage
        const userDataFromLocalStorage = localStorage.getItem("user");
        const userData = JSON.parse(userDataFromLocalStorage);
        const userId = userData._id;
        // Make a request to the API to fetch upcoming schedules for the seller
        const response = await fetch(
          `http://localhost:3000/inspections/upcoming-seller/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming schedules");
        }
        const data = await response.json();
        console.log(data);
        // Update the component state with the fetched schedules data
        setSchedules(data.inspectionsWithCarDetails || []);

        console.log("schedules", schedules);
      } catch (error) {
        console.error("Error fetching upcoming schedules:", error);
      }
    };

    fetchSchedules();
  }, []);

  return (
    <div>
      <EmailBuyerPopup
        showEmailBuyerPopup={showEmailBuyerPopup}
        setShowEmailBuyerPopup={setShowEmailBuyerPopup}
      />

      <AddRWCPopup
        showAddRWCPopup={showAddRWCPopup}
        setShowAddRWCPopup={setShowAddRWCPopup}
      />

      <CancelPopup
        showCancelPopup={showCancelPopup}
        setShowCancelPopup={setShowCancelPopup}
      />

            {schedules.map((schedule, index) => (
                <div key={index} className='ctr-schedule'>
                    <div className='ctr-schedule-buyer-detail'>
                                {schedule.car ? (
                                    <div>
                                        <h3>Car: <span>{schedule.car.make}</span> <span>{schedule.car.model}</span></h3>
                                        <p>Date: <span>{formatDateString(schedule.inspectionDate)}</span></p>
                                        <p>Time: <span>{schedule.inspectionTime}</span></p>
                                        {schedule.mechanic_id ? (
                                            <p>Mechanic Status: <span>Your Inspection has been accepted by the mechanic</span></p>
                                        ) : (
                                            <p>No Mechanic has accepted the inspection</p>
                                        )}
                                    </div>
                                ) : (
                                    <p className='align-p'>No car details available</p>
                                )}
                                </div>
                    <div className='ctr-schedule-option'>
                      <img src={schedule.car.carPhotos[0]} alt={`Car Image`} />
                        <div className="ctr-schedule-option-s">
                          <button onClick={openEmailBuyerPopup}>Email Buyer</button>
                          <button onClick={openAddRWCPopup}>Add RWC</button>
                          <button onClick={() => openCancelPopup(schedule)}>Cancel booking</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SellerSchedule;
