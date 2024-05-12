import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default CSS

export default function BookSellerPopup({
  showBookSellerPopup,
  setShowBookSellerPopup,
  carData,
}) {
  const [startDate, setStartDate] = useState(null);
  const [selectedHour, setSelectedHour] = useState("09:00");

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 1 && day !== 4;
  };

  async function handleBookInspection(data) {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        //const date = new Date(data.date).toLocaleDateString();
        await fetch(
          `http://localhost:3000/inspections/inspection-form/${carData._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inspectionDate: data.date,
              inspectionTime: data.time,
              buyer_id: userData._id,
            }),
          }
        );
        console.log("Inspection booked");
      } else {
        throw new Error("User is not authorised");
      }
    } catch (error) {
      console.log("error while booking inspection", error);
    }
  }

  return (
    <>
      {showBookSellerPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <div className="popup-content">
              <span
                className="close"
                onClick={() => setShowBookSellerPopup(false)}
              >
                &times;
              </span>
              <h2>Book An Inspection</h2>
              <p>
                Car ID: <span>CT1234</span>
              </p>
              <p>Enter a preferred date and time.</p>
              <br />
              <div className="ctr-unlock-profile">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = { date: startDate, time: selectedHour };
                    handleBookInspection(data);
                  }}
                >
                  <label htmlFor="requestDate">Date:</label>
                  <div className="custom-datepicker">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      filterDate={isWeekday}
                      placeholderText="Select a weekday"
                      required
                    />
                  </div>
                  <label htmlFor="requestTime">Time:</label>
                  <select
                    className="custom-select"
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(e.target.value)}
                    required
                  >
                    {Array.from({ length: 13 }, (_, i) => i + 8).map((hour) => (
                      <option
                        key={hour}
                        value={hour.toString().padStart(2, "0") + ":00"}
                      >
                        {hour.toString().padStart(2, "0") + ":00"}
                      </option>
                    ))}
                  </select>
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
