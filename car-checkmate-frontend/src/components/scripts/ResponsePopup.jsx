import React from "react";

export default function ResponsePopup({ message, showResponsePopup, setShowResponsePopup }) {

    const handleClosePopup = () => {
        setShowResponsePopup(false);
        window.location.reload(); // Reload the page
    };

    return (
        <>
            {showResponsePopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={handleClosePopup}>&times;</span>
                            <h3>{message}</h3>
                            <br />
                            <div className='button-container'>
                                <button onClick={handleClosePopup}>Close</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}