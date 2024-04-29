import React from "react";

export default function BookSellerPopup({ showBookSellerPopup, setShowBookSellerPopup }) {

    return (
        <>
            {showBookSellerPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowBookSellerPopup(false)}>&times;</span>
                            <h2>Book An Inspection</h2>
                                <p>Car ID: <span>CT1234</span></p>
                                <p>Enter a preferred date and time.</p>
                                <br />
                                <div className='ctr-unlock-profile'>
                                    <form>
                                        <label htmlFor='requestDate'>Date:</label>
                                        <input type="date" name="requestDate" required />
                                        <label htmlFor='requestTime'>Time:</label>
                                        <input type="time" name="requestDate" required />
                                        <br />
                                        <div className='button-container'>
                                            <button type='submit'>Book</button>
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