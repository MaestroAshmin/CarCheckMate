import React, { useState } from 'react';

export default function AddRWCPopup({ showAddRWCPopup, setShowAddRWCPopup }) {

    const [licenseData, setLicenseData] = useState({
        fileUploadRWC: null
    });

    const handleRWCFileChange = (e) => {
        const file = e.target.files[0];
        setLicenseData({
            ...licenseData,
            fileUploadRWC: file
        });
    };

    return (
        <>
            {showAddRWCPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowAddRWCPopup(false)}>&times;</span>
                            <h2>Add Roadworthy</h2>
                            <p>Car ID: <span>CR1234</span></p>
                            <form>
                                <div className='button-container'>
                                    <div className='file-upload clearfix'>
                                        <label className='file-upload-btn' htmlFor='fileUploadRWC'>Choose File</label>
                                        <span className='file-name'>{licenseData.fileUploadRWC ? licenseData.fileUploadRWC.name : 'No file selected'}</span>
                                        <input type='file' id='fileUploadRWC' name='fileUploadRWC' accept='image/*,.pdf' onChange={handleRWCFileChange} />
                                        <div className='new-line-button'>
                                            <button type='submit'>Confirm</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}