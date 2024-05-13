import React from "react";

export default function EmailBuyerPopup({ showEmailBuyerPopup, setShowEmailBuyerPopup }) {

    return (
        <>
            {showEmailBuyerPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup-signup'>
                        <div className='popup-content-signup'>
                            <span className='close' onClick={() => setShowEmailBuyerPopup(false)}>&times;</span>
                            <h2>Send Email To Buyer</h2>
                            <p>Car ID: <span>CR1234</span></p>
                            <form>
                                <div className='ctr-register-info'>
                                    <label className='ctr-register-info-email-label' htmlFor='emailContent'>Please write messages here</label>
                                    <textarea id='emailContent' name='emailContent' placeholder='Enter Your Message Here' required />
                                </div>
                                <div className='button-container'>
                                    <button type='submit'>Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}