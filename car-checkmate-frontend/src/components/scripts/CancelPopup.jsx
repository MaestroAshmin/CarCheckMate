import React from "react";

export default function CancelPopup({ showCancelPopup, setShowCancelPopup }) {

    return (
        <>
            {showCancelPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowCancelPopup(false)}>&times;</span>
                            <h2>Cancel Inspection</h2>
                            <p>Please confirm your cancelled inspection.</p>
                            <p>Car ID: <span>CR1234</span></p>
                            <form>
                                <div className='button-container'>
                                    <button type='submit'>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}