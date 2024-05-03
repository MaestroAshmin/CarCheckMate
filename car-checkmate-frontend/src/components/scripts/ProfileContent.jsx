import { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

function ProfileContent() {
    const [isVerifyingDL, setIsVerifyingDL] = useState(false);
    const [licenseData, setLicenseData] = useState({
        driverLicenseNumber: 'DL65432',
        state: '',
        licenseExpiry: '2024-05-13',
        cardNumber: '',
        frontImage: null,
        backImage: null
    });
    const [daysDLLeft, setDaysDLLeft] = useState(null);

    useEffect(() => {
        if (licenseData.licenseDLNumber && licenseData.expiryDateDL) {
            calculateDaysLeft();
        }
    }, [licenseData.licenseDLNumber, licenseData.expiryDateDL]);

    const calculateDaysLeft = () => {
        const expiryDate = new Date(licenseData.expiryDateDL);
        const today = new Date();
        const diffTime = expiryDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysDLLeft(diffDays);
    };

    const handleVerifyDLClick = () => {
        setIsVerifyingDL(true);
    };

    const handleSaveDLClick = () => {
        handleSellerFeatures();
        // Implement save functionality here
        setIsVerifyingDL(false);
        calculateDaysLeft();
        // You can save the license data to state or send it to the server
    };

    const handleDLFileChange = async(e, type) => {
        const file = e.target.files[0];
        const base64 = await ConvertTobase64(file)
        console.log(type, base64)

        setLicenseData({
            ...licenseData,
            [type]: base64
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData({
            ...licenseData,
            [name]: value
        });
    };

    async function handleSellerFeatures() {
        console.log("licenseData: ",licenseData)
        try{
            const userDataFromLocalStorage = localStorage.getItem('user');
            const userData = JSON.parse(userDataFromLocalStorage);

            await fetch("http://localhost:3000/verification/seller-verification",{
                method:"POST", 
                credentials:"include",
                headers:{
                    "Content-Type" : "application/json",

                },
                body:JSON.stringify({...licenseData,seller_id:userData._id})
    
            })
        } catch(error){console.log("error while submitting form", error)} 
        //const result = await fetch()
        
    }

    const ConvertTobase64 = (file) => {
        return new Promise((resolve, reject) => {
          const filereader = new FileReader();
          filereader.readAsDataURL(file);
          filereader.onload = () => {
            resolve(filereader.result);
          };
          filereader.onerror = (error) => {
            reject(error);
          };
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
                                <label name='state'>State:</label>
                                <select name="state" value={licenseData.state} onChange={handleChange}>
                                    <option value="">Select State</option>
                                    <option value="ACT">Australian Capital Territory</option>
                                    <option value="NSW">New South Wales</option>
                                    <option value="NT">Northern Territory</option>
                                    <option value="QLD">Queensland</option>
                                    <option value="SA">South Australia</option>
                                    <option value="TAS">Tasmania</option>
                                    <option value="VIC">Victoria</option>
                                    <option value="WA">Western Australia</option>
                                </select>
                                <br />
                                <label name='expiryDateDL'>Expiry Date:</label>
                                <input type="date" name="expiryDateDL" value={licenseData.expiryDateDL} onChange={handleChange} />
                                <br />
                                <label name='cardNumber'>Card Number:</label>
                                <input type="text" name="cardNumber" placeholder="Card Number" value={licenseData.cardNumber} onChange={handleChange} />
                                <br />
                                <label htmlFor='fileUploadFront'>Upload Front Image:</label>
                                <div className='file-upload'>
                                    <label className='file-upload-btn' htmlFor='fileUploadFront'>Choose File</label>
                                    <span className='file-name'>{licenseData.frontImage ? licenseData.frontImage.name : 'No file selected'}</span>
                                    <input type='file' id='fileUploadFront' name='fileUploadFront' accept='image/*' onChange={(e) => handleDLFileChange(e, 'frontImage')} />
                                </div>
                                <br />
                                <label htmlFor='fileUploadBack'>Upload Back Image:</label>
                                <div className='file-upload'>
                                    <label className='file-upload-btn' htmlFor='fileUploadBack'>Choose File</label>
                                    <span className='file-name'>{licenseData.backImage ? licenseData.backImage.name : 'No file selected'}</span>
                                    <input type='file' id='fileUploadBack' name='fileUploadBack' accept='image/*' onChange={(e) => handleDLFileChange(e, 'backImage')} />
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
            </div>
       </div>
    );
}

export default ProfileContent;
