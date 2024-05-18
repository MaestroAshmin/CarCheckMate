import React from "react";

export default function EmailBuyerPopup({
  showEmailBuyerPopup,
  setShowEmailBuyerPopup,
}) {
  // console.log(showEmailBuyerPopup);
  async function sendEmail(e) {
    e.preventDefault();
    const email = e.target.emailContent.value;
    // console.log("Inspection ID", showEmailBuyerPopup);
    try {
      await fetch(
        `http://localhost:3000/inspections/sendEmailToBuyer/${showEmailBuyerPopup}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: email,
          }),
        }
      );
      console.log("Email Sent");
      e.target.emailContent.value = "";
      setShowEmailBuyerPopup(null);
    } catch (error) {
      console.log("Error while sending email to the buyer", error);
    }
  }
  return (
    <>
      {showEmailBuyerPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup-signup">
            <div className="popup-content-signup">
              <span
                className="close"
                onClick={() => setShowEmailBuyerPopup(false)}
              >
                &times;
              </span>
              <h2>Send Email To Buyer</h2>
              <p>
                Car ID: <span>CR1234</span>
              </p>
              <form onSubmit={sendEmail}>
                <div className="ctr-register-info">
                  <label
                    className="ctr-register-info-email-label"
                    htmlFor="emailContent"
                  >
                    Please write messages here
                  </label>
                  <textarea
                    id="emailContent"
                    name="emailContent"
                    placeholder="Enter Your Message Here"
                    required
                  />
                </div>
                <div className="button-container">
                  <button type="submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
