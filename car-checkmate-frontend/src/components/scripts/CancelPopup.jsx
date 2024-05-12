import React, { useState } from "react";

export default function CancelPopup({
  showCancelPopup,
  setShowCancelPopup,
  inspection,
}) {
  const [cancellationReason, setCancellationReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("Inspection Details", showCancelPopup);
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("inspectionMessage", cancellationReason);

      const response = await fetch(
        `http://localhost:3000/inspections/deny/${showCancelPopup._id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        // Close the popup after successful submission
        setShowCancelPopup(false);
        // Refresh the page
        window.location.reload();
      } else {
        // Extract error message from response
        const data = await response.json();
        setErrorMessage(data.error);
      }
    } catch (error) {
      console.error("Error cancelling inspection:", error);
      setErrorMessage("Internal server error.");
    }
  };

  return (
    <>
      {showCancelPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup">
            <div className="popup-content">
              <span className="close" onClick={() => setShowCancelPopup(false)}>
                &times;
              </span>
              <h2>Cancel Inspection</h2>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <p>Please confirm your cancelled inspection.</p>
              <form onSubmit={handleSubmit}>
                <div className="button-container">
                  <textarea
                    placeholder="Please enter the reason why you are going to cancel this requested inspection."
                    value={cancellationReason}
                    onChange={(event) =>
                      setCancellationReason(event.target.value)
                    }
                  ></textarea>
                </div>
                <div className="button-container">
                  <button type="submit">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
