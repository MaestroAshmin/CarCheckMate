import React from "react";

export default function EmailSellerPopup({
  showEmailSellerPopup,
  setShowEmailSellerPopup,
}) {
  async function sendEmail(e) {
    e.preventDefault();
    const email = e.target.emailContent.value;
    try {
      await fetch(
        `http://localhost:3000/inspections/sendEmailToSeller/${showEmailSellerPopup}`,
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
      setShowEmailSellerPopup(null);
    } catch (error) {
      console.log("Error while sending email to the seller", error);
    }
  }
  return (
    <>
      {showEmailSellerPopup && (
        <>
          <div className="overlay"></div>
          <div className="popup-signup">
            <div className="popup-content-signup">
              <span
                className="close"
                onClick={() => setShowEmailSellerPopup(false)}
              >
                &times;
              </span>
              <h2>Send Email To Seller</h2>
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
