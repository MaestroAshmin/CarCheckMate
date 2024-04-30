import React, { useState } from "react";
import axios from "axios";

export default function BookMechanicPopup({ showBookMechanicPopup, setShowBookMechanicPopup, _id }) {
  const [inspectionDate, setInspectionDate] = useState("");
  const [inspectionTime, setInspectionTime] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(null);
    setError(null);

    try {
      const response = await axios.post(`http://localhost:3000/inspections/inspection-form/${_id}`, {
        inspectionDate,
        inspectionTime,
      });

      if (response.status === 200) {
        console.log("Inspection booked successfully");
        setSuccessMessage("Inspection booked successfully");
        setShowBookMechanicPopup(false);
      } else {
        console.error("Error booking inspection");
        setError(response.data.error);
      }
    } catch (error) {
      console.error("Error booking inspection:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      {showBookMechanicPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={() => setShowBookMechanicPopup(false)}>
                &times;
              </span>
              <h2>Book An Inspection</h2>
              <p>
                Car ID: <span>{_id}</span>
              </p>
              <p>Enter a preferred date and time.</p>
              <br />
              <div className="ctr-unlock-profile">
                <form onSubmit={handleSubmit}>
                  {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
                  {successMessage && <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>}
                  <label htmlFor="requestDate">Date:</label>
                  <input
                    type="date"
                    name="requestDate"
                    required
                    value={inspectionDate}
                    onChange={(e) => setInspectionDate(e.target.value)}
                  />
                  <label htmlFor="requestTime">Time:</label>
                  <input
                    type="time"
                    name="requestTime"
                    required
                    value={inspectionTime}
                    onChange={(e) => setInspectionTime(e.target.value)}
                  />
                  <br />
                  <div className="button-container">
                    <button type="submit">Book</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}