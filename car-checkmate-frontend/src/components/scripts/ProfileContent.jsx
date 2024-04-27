import { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

function ProfileContent() {
    const [isVerifyingDL, setIsVerifyingDL] = useState(false);
    const [isVerifyingLVT, setIsVerifyingLVT] = useState(false);
    const [licenseData, setLicenseData] = useState({
        licenseDLNumber: 'DL65432',
        expiryDateDL: '2024-05-13',
        licenseLVTNumber: '',
        expiryDateLVT: ''
    });
    const [daysDLLeft, setDaysDLLeft] = useState(null);
    const [daysLVTLeft, setDaysLVTLeft] = useState(null);

    useEffect(() => {
        if (licenseData.licenseDLNumber && licenseData.expiryDateDL) {
            calculateDaysLeft('DL');
        }
        if (licenseData.licenseLVTNumber && licenseData.expiryDateLVT) {
            calculateDaysLeft('LVT');
        }
    }, []);

    const calculateDaysLeft = (type) => {
        const expiryDate = new Date(licenseData[`expiryDate${type}`]);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (type === 'DL') {
            setDaysDLLeft(diffDays);
        } else if (type === 'LVT') {
            setDaysLVTLeft(diffDays);
        }
    };

    const handleVerifyDLClick = () => {
        setIsVerifyingDL(true);
    };

    const handleSaveDLClick = () => {
        // Implement save functionality here
        setIsVerifyingDL(false);
        calculateDaysLeft('DL');
        // You can save the license data to state or send it to the server
    };

    const handleDLFileChange = (e) => {
        const file = e.target.files[0];
        setLicenseData({
            ...licenseData,
            fileUploadDL: file
        });
    };

    const handleLVTFileChange = (e) => {
        const file = e.target.files[0];
        setLicenseData({
            ...licenseData,
            fileUploadLVT: file
        });
    };
    
    const handleVerifyLVTClick = () => {
        setIsVerifyingLVT(true);
    };

    const handleSaveLVTClick = () => {
        // Implement save functionality here
        setIsVerifyingLVT(false);
        calculateDaysLeft('LVT');
        // You can save the license data to state or send it to the server
    };    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData({
            ...licenseData,
            [name]: value
        });
    };

    return (
        <div className='ctr-user-content'>
            <div className='ctr-user-content-left'>
                <h3>Profile</h3>
                <UserDetails />
            </div>
            <div className='ctr-user-content-right'>
                <h3>Unlock Seller Features</h3>
                    <div className='ctr-unlock-profile'>
                        {isVerifyingDL ? (
                            <>
                                <label name='licenseDLNumber'>Driver's License Number:</label>
                                <br />
                                <input type="text" name="licenseDLNumber" placeholder="Driver's License Number" value={licenseData.licenseDLNumber} onChange={handleChange} />
                                <br />
                                <label name='expiryDateDL'>Expiry Date:</label>
                                <input type="date" name="expiryDateDL" value={licenseData.expiryDateDL} onChange={handleChange} />
                                <br />
                                <label htmlFor='fileUploadDL'>Upload Driver License Document:</label>
                                <div className='file-upload'>
                                    <label className='file-upload-btn' htmlFor='fileUploadDL'>Choose File</label>
                                    <span className='file-name'>{licenseData.fileUploadDL ? licenseData.fileUploadDL.name : 'No file selected'}</span>
                                    <input type='file' id='fileUploadDL' name='fileUploadDL' accept='image/*,.pdf' onChange={handleDLFileChange} />
                                </div>
                                <br />
                                <button onClick={handleSaveDLClick}>Save</button>
                            </>
                        ) : (
                            <button onClick={handleVerifyDLClick}>Verify ID</button>
                        )}

                        {daysDLLeft !== null && (
                            <>
                                <p>License ID: {licenseData.licenseDLNumber}</p>
                                <p>Expiry Date: {licenseData.expiryDateDL}</p>
                                <p>Days Left Until Expiry: {daysDLLeft}</p>
                            </>
                        )}
                    </div>

                <h3>Unlock Mechanic Features</h3>
                    <div className='ctr-unlock-profile'>
                        {isVerifyingLVT ? (
                            <>
                                <label name='licenseLVTNumber'>Licensed Vehicle Testers (LVT) Number:</label>
                                <br />
                                <input type="text" name="licenseLVTNumber" placeholder="Licensed Vehicle Testers (LVT) Number" value={licenseData.licenseLVTNumber} onChange={handleChange} />
                                <br />
                                <label name='expiryDateLVT'>Expiry Date:</label>
                                <input type="date" name="expiryDateLVT" value={licenseData.expiryDateLVT} onChange={handleChange} />
                                <br />
                                <label name='fileUploadLVT'>Upload LVT License Document:</label>
                                <div className='file-upload'>
                                    <label className='file-upload-btn' htmlFor='fileUploadLVT'>Choose File</label>
                                    <span className='file-name'>{licenseData.fileUploadLVT ? licenseData.fileUploadLVT.name : 'No file selected'}</span>
                                    <input type='file' id='fileUploadLVT' name='fileUploadLVT' accept='image/*,.pdf' onChange={handleLVTFileChange} />
                                </div>
                                <br />
                                <button onClick={handleSaveLVTClick}>Save</button>
                            </>
                        ) : (
                            <button onClick={handleVerifyLVTClick}>Verify ID</button>
                        )}

                        {daysLVTLeft !== null && (
                            <>
                                <p>License ID: {licenseData.licenseLVTNumber}</p>
                                <p>Expiry Date: {licenseData.expiryDateLVT}</p>
                                <p>Days Left Until Expiry: {daysLVTLeft}</p>
                            </>
                        )}
                    </div>
            </div>
       </div>
    );
}

export default ProfileContent;
