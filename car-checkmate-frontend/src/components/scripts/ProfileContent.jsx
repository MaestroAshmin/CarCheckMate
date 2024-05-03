import { useState, useEffect } from 'react';
import UserDetails from './UserDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCheckCircle  } from '@fortawesome/free-solid-svg-icons';

function ProfileContent() {
    const [sellerVerificationData, setSellerVerificationData] = useState(null);
    const [isVerifyingDL, setIsVerifyingDL] = useState(false);
    const [licenseData, setLicenseData] = useState({
        driverLicenseNumber: "",
        state: "",
        licenseExpiry: "",
        cardNumber: "",
        frontImage: null,
        backImage: null
    });
    const [daysDLLeft, setDaysDLLeft] = useState(null);
    const [isSeller, setIsSeller] = useState(false); // State to store whether the user is a seller
    const [sellerProfileUnlocked, setSellerProfileUnlocked] = useState(false);

    // Function to fetch seller verification details
    const fetchSellerVerificationDetails = async () => {
        try {
            // Fetch user data from local storage
            const userDataFromLocalStorage = localStorage.getItem('user');
            const userData = JSON.parse(userDataFromLocalStorage);
            const seller_id = userData._id;
            // Fetch seller verification details using seller ID
            const response = await fetch(`http://localhost:3000/verification/get-verification-data/${seller_id}`);
            if (response.ok) {
                const verificationDetails = await response.json();
                setSellerVerificationData(verificationDetails);
                setSellerProfileUnlocked(true);
                console.log(sellerVerificationData);
            } else {
                console.error('Failed to fetch seller verification details:', response.status);
            }
        } catch (error) {
            console.error('Error fetching seller verification details:', error);
        }
    };

    //Check if seller is verified or not
    useEffect(() => {
        // Fetch user data from local storage
        const userDataFromLocalStorage = localStorage.getItem('user');
        const userData = JSON.parse(userDataFromLocalStorage);
        const seller_id = userData._id;
        // Check if the user is a seller
        if (userData && userData.seller) {
            setIsSeller(true); // Set isSeller state to true if the user is a seller
            fetchSellerVerificationDetails();
            // if (userData.sellerVerified) {
            //     setSellerProfileUnlocked(true); // Set sellerProfileUnlocked state to true if the seller profile has been unlocked
            // }
            // Set seller_id as part of the licenseData state
            setLicenseData(prevLicenseData => ({
                ...prevLicenseData,
                seller_id: seller_id
            }));
        }
    }, []);
    useEffect(() => {
        if (licenseData.driverLicenseNumber && licenseData.licenseExpiry) {
            calculateDaysLeft();
        }
    }, [licenseData.driverLicenseNumber, licenseData.licenseExpiry]);

    const calculateDaysLeft = () => {
        const expiryDate = new Date(licenseData.licenseExpiry);
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
        // const base64 = await ConvertTobase64(file)
        // console.log(type, base64)

        // setLicenseData({
        //     ...licenseData,
        //     [type]: base64
        // });
        // const file = e.target.files[0];
        // setLicenseData({
        //     ...licenseData,
        //     [type]: file // Append the file directly to the licenseData
        // });
         // Construct FormData
        const formData = new FormData();
        formData.append(type, file);

        // Update licenseData with FormData
        setLicenseData(prevLicenseData => ({
            ...prevLicenseData,
            [type]: file // Append file
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData({
            ...licenseData,
            [name]: value
        });
    };

    const handleSellerFeatures = async () => {
        try {
            console.log(licenseData);
            // Ensure licenseData is a FormData object
            const formData = new FormData();
            console.log(formData);
            // Append data to the formData object
            Object.entries(licenseData).forEach(([key, value]) => {
                formData.append(key, value);
            });
    
            await fetch("http://localhost:3000/verification/seller-verification", {
                method: "POST",
                body: formData
            });
        } catch (error) {
            console.log("Error while submitting form", error);
        }
    };

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
            { isSeller && !sellerProfileUnlocked && ( // Render the section only if the user is a seller
                    <div>
                    <h3>Unlock Seller Features</h3>
                        <div className='ctr-unlock-profile'>
                            {isVerifyingDL ? (
                                <>  
                                    <label name='licenseDLNumber'>Driver's License Number:</label>
                                    <br />
                                    <input type="text" name="driverLicenseNumber" placeholder="Driver's License Number" value={licenseData.licenseDLNumber} onChange={handleChange} />
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
                                    <input type="date" name="licenseExpiry" value={licenseData.licenseExpiry} onChange={handleChange} />
                                    <br />
                                    <label name='cardNumber'>Card Number:</label>
                                    <input type="text" name="cardNumber" placeholder="Card Number" value={licenseData.cardNumber} onChange={handleChange} />
                                    <br />
                                    <label htmlFor='fileUploadFront'>Upload Front Image:</label>
                                    <div className='file-upload'>
                                        <label className='file-upload-btn' htmlFor='fileUploadFront'>Choose File</label>
                                        <span className='file-name'>{licenseData.frontImage ? licenseData.frontImage.name : 'No file selected'}</span>
                                        <input type='file' id='fileUploadFront' name='frontImage' accept='image/*' onChange={(e) => handleDLFileChange(e, 'frontImage')} />
                                    </div>
                                    <br />
                                    <label htmlFor='fileUploadBack'>Upload Back Image:</label>
                                    <div className='file-upload'>
                                        <label className='file-upload-btn' htmlFor='fileUploadBack'>Choose File</label>
                                        <span className='file-name'>{licenseData.backImage ? licenseData.backImage.name : 'No file selected'}</span>
                                        <input type='file' id='fileUploadBack' name='backImage' accept='image/*' onChange={(e) => handleDLFileChange(e, 'backImage')} />
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
                 )}
                 {sellerProfileUnlocked && ( // Render a message if the seller profile is already unlocked
                 
                    <div className="seller-verification-container">
                    <h3>Your license data</h3>
                    <div className="seller-verification-details">
                        <div className="detail">
                            <span className="label">Driver's License Number:</span>
                            <span className="value">{sellerVerificationData.driverLicenseNumber}</span>
                        </div>
                        <div className="detail">
                            <span className="label">State:</span>
                            <span className="value">{sellerVerificationData.state}</span>
                        </div>
                        <div className="detail">
                            <span className="label">License Expiry:</span>
                            <span className="value">{sellerVerificationData.licenseExpiry}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Card Number:</span>
                            <span className="value">{sellerVerificationData.cardNumber}</span>
                        </div>
                        <div className="detail">
                            <span className="label">Front Image:</span>
                            <img className="image" src={sellerVerificationData.frontImage} alt="Front Image" />
                        </div>
                        <div className="detail">
                            <span className="label">Back Image:</span>
                            <img className="image" src={sellerVerificationData.backImage} alt="Back Image" />
                        </div>
                        Verification Status: {sellerVerificationData.verifiedByAdmin ? (
                            <FontAwesomeIcon icon={faCheckCircle} color="green" />
                        ) : (
                            <span>Not Verified</span>
                        )}
                    </div>
                </div>
    
                )}
            </div>
       </div>
    );
}

export default ProfileContent;
