import { useState, useEffect } from "react";
import UserDetails from "./UserDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function ProfileContent() {
  const [sellerVerificationData, setSellerVerificationData] = useState(null);
  const [mechanicVerificationData, setMechanicVerificationData] =
    useState(null);
  const [isVerifyingDL, setIsVerifyingDL] = useState(false);
  const [isVerifyingLVT, setIsVerifyingLVT] = useState(false);
  const [licenseData, setLicenseData] = useState({
    driverLicenseNumber: "",
    state: "",
    licenseExpiry: "",
    cardNumber: "",
    frontImage: null,
    backImage: null,
  });
  const [licenseLVTData, setLicenseLVTData] = useState({
    licenseLVTNumber: "",
    expiryDateLVT: "",
    certificateNumber: "",
  });

  const [daysDLLeft, setDaysDLLeft] = useState(null);
  const [daysLVTLeft, setDaysLVTLeft] = useState(null);
  const [isSeller, setIsSeller] = useState(false); // State to store whether the user is a seller
  const [isMechanic, setIsMechanic] = useState(false); // State to store whether the user is a seller
  const [sellerProfileUnlocked, setSellerProfileUnlocked] = useState(false);
  const [mechenidProfileUnlocked, setMechanicProfileUnlocked] = useState(false);

  const [mechanicRequest, setMechanicRequest] = useState({ findUser: false });

  // Function to fetch seller verification details
  const fetchSellerVerificationDetails = async () => {
    try {
      // Fetch user data from local storage
      const userDataFromLocalStorage = localStorage.getItem("user");
      const userData = JSON.parse(userDataFromLocalStorage);
      const seller_id = userData._id;
      // Fetch seller verification details using seller ID
      const response = await fetch(
        `http://localhost:3000/verification/get-verification-data/${seller_id}`
      );
      if (response.ok) {
        const verificationDetails = await response.json();
        setSellerVerificationData(verificationDetails);
        setSellerProfileUnlocked(true);
        console.log(sellerVerificationData);
      } else {
        console.error(
          "Failed to fetch seller verification details:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching seller verification details:", error);
    }
  };

  //Check if seller is verified or not
  useEffect(() => {
    // Fetch user data from local storage
    const userDataFromLocalStorage = localStorage.getItem("user");
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
      setLicenseData((prevLicenseData) => ({
        ...prevLicenseData,
        seller_id: seller_id,
      }));
    }

    async function checkMechanicVerification() {
      try {
        const response = await fetch(
          `http://localhost:3000/mechanic-verification/checkVerificationStatus/${userData._id}`
        );

        const data = await response.json();
        console.log("mechanic data", data);
        if (data.findUser) {
          setMechanicRequest({
            findUser: data.findUser,
            pending: data.userData.verificationPending,
            reqStatus: data.userData.verificationStatus,
            userData: {
              ...data.userData,
              expiryDate: new Date(
                data.userData.expiryDate
              ).toLocaleDateString(),
            },
          });
        }
      } catch (error) {
        console.log(
          "Error while checking mechanic verfifcation request",
          error
        );
      }
    }
    if (userData.mechanic) {
      checkMechanicVerification();
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

  const handleVerifyLVTClick = () => {
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    // console.log("user", user);
    if (user.mechanic) setIsVerifyingLVT(true);
  };

  const handleSaveDLClick = () => {
    handleSellerFeatures();
    // Implement save functionality here
    setIsVerifyingDL(false);
    calculateDaysLeft();
    // You can save the license data to state or send it to the server
  };

  const handleSaveLVTClick = async () => {
    // Implement save functionality here
    setIsVerifyingLVT(false);

    calculateDaysLeft("LVT");
    // You can save the license data to state or send it to the server
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const formData = new FormData();
    formData.append("licenseLVTNumber", licenseLVTData.licenseLVTNumber);
    formData.append("expiryDateLVT", licenseLVTData.expiryDateLVT);
    formData.append("document", licenseLVTData.document);
    formData.append("userID", userData._id);
    console.log("license data", licenseLVTData);
    console.log("form data", formData);
    await fetch(
      "http://localhost:3000/mechanic-verification/unlockFeaturesMechanic",
      {
        method: "POST",
        body: formData,
      }
    );
  };

  const handleDLFileChange = async (e, type) => {
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
    setLicenseData((prevLicenseData) => ({
      ...prevLicenseData,
      [type]: file, // Append file
    }));
  };

  const handleLVTFileChange = (e) => {
    const file = e.target.files[0];
    setLicenseLVTData({
      ...licenseLVTData,
      document: file,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLicenseData({
      ...licenseData,
      [name]: value,
    });
  };

  const handleChangeLVT = (e) => {
    const { name, value } = e.target;
    setLicenseLVTData({
      ...licenseLVTData,
      [name]: value,
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
        body: formData,
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
    <div className="ctr-user-content">
      <div className="ctr-user-content-left">
        <h3>Profile</h3>
        <UserDetails />
      </div>
      <div className="ctr-user-content-right">
        {/* verify seller */}
        {isSeller &&
          !sellerProfileUnlocked && ( // Render the section only if the user is a seller
            <div>
              <h3>Unlock Seller Features</h3>
              <div className="ctr-unlock-profile">
                {isVerifyingDL ? (
                  <>
                    <label name="licenseDLNumber">
                      Driver's License Number:
                    </label>
                    <br />
                    <input
                      type="text"
                      name="driverLicenseNumber"
                      placeholder="Driver's License Number"
                      value={licenseData.licenseDLNumber}
                      onChange={handleChange}
                    />
                    <br />
                    <label name="state">State:</label>
                    <select
                      name="state"
                      value={licenseData.state}
                      onChange={handleChange}
                    >
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
                    <label name="expiryDateDL">Expiry Date:</label>
                    <input
                      type="date"
                      name="licenseExpiry"
                      value={licenseData.licenseExpiry}
                      onChange={handleChange}
                    />
                    <br />
                    <label name="cardNumber">Card Number:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={licenseData.cardNumber}
                      onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="fileUploadFront">Upload Front Image:</label>
                    <div className="file-upload">
                      <label
                        className="file-upload-btn"
                        htmlFor="fileUploadFront"
                      >
                        Choose File
                      </label>
                      <span className="file-name">
                        {licenseData.frontImage
                          ? licenseData.frontImage.name
                          : "No file selected"}
                      </span>
                      <input
                        type="file"
                        id="fileUploadFront"
                        name="frontImage"
                        accept="image/*"
                        onChange={(e) => handleDLFileChange(e, "frontImage")}
                      />
                    </div>
                    <br />
                    <label htmlFor="fileUploadBack">Upload Back Image:</label>
                    <div className="file-upload">
                      <label
                        className="file-upload-btn"
                        htmlFor="fileUploadBack"
                      >
                        Choose File
                      </label>
                      <span className="file-name">
                        {licenseData.backImage
                          ? licenseData.backImage.name
                          : "No file selected"}
                      </span>
                      <input
                        type="file"
                        id="fileUploadBack"
                        name="backImage"
                        accept="image/*"
                        onChange={(e) => handleDLFileChange(e, "backImage")}
                      />
                    </div>
                    <br />
                    <button onClick={handleSaveDLClick}>Save</button>
                  </>
                ) : (
                  <button onClick={handleVerifyDLClick}>Verify ID</button>
                )}

                {/*{daysDLLeft !== null && (
                                <>
                                    <p>License ID: {licenseData.licenseDLNumber}</p>
                                    <p>Expiry Date: {licenseData.expiryDateDL}</p>
                                    <p>Days Left Until Expiry: {daysDLLeft}</p>
                                </>
                            )}*/}
              </div>
            </div>
          )}
        {sellerProfileUnlocked && ( // Render a message if the seller profile is already unlocked
          <>
            <h3>Your license data</h3>
            <p className="detail">
              <b>Driver's License Number:</b>&nbsp;
              <span className="value">
                {sellerVerificationData.driverLicenseNumber}
              </span>
            </p>
            <p className="detail">
              <b>State:</b>&nbsp;
              <span className="value">{sellerVerificationData.state}</span>
            </p>
            <p className="detail">
              <b>License Expiry:</b>&nbsp;
              <span className="value">
                {new Date(
                  sellerVerificationData.licenseExpiry
                ).toLocaleDateString("en-GB")}
              </span>
            </p>
            <p className="detail">
              <b>Card Number:</b>&nbsp;
              <span className="value">{sellerVerificationData.cardNumber}</span>
            </p>
            <p className="detail">
              <b>Front Image:</b>&nbsp;
              <img src={sellerVerificationData.frontImage} alt="Front Image" />
            </p>
            <p className="detail">
              <b>Back Image:</b>&nbsp;
              <img src={sellerVerificationData.backImage} alt="Back Image" />
            </p>
            <p className="detail">
              <b>Verification Status:</b>{" "}
              {sellerVerificationData.verifiedByAdmin ? (
                <FontAwesomeIcon icon={faCheckCircle} color="green" />
              ) : (
                <span>Not Verified</span>
              )}
            </p>
          </>
        )}

        <br />

        {/*verify machenic*/}
        <h3>Unlock Mechanic Features</h3>
        <div className="ctr-unlock-profile">
          {isVerifyingLVT ? (
            mechanicRequest.findUser ? (
              <div>
                <p>
                  Licensed Vehicle Testers (LVT) Number:{" "}
                  {mechanicRequest.userData.licenseNumber}
                </p>
                <p>Expiry Date : {mechanicRequest.userData.expiryDate}</p>

                <p>
                  Verification Status :{" "}
                  {mechanicRequest.pending
                    ? "Pending"
                    : mechanicRequest.reqStatus
                    ? "Approved"
                    : "Denied"}
                </p>
                <button
                  onClick={() => {
                    window.open(
                      mechanicRequest.userData.documentPath,
                      "_blank"
                    );
                  }}
                >
                  {" "}
                  Preview{" "}
                </button>
              </div>
            ) : (
              <>
                <label name="licenseLVTNumber">
                  Licensed Vehicle Testers (LVT) Number:
                </label>
                <br />
                <input
                  type="text"
                  name="licenseLVTNumber"
                  placeholder="Licensed Vehicle Testers (LVT) Number"
                  value={licenseData.licenseLVTNumber}
                  onChange={handleChangeLVT}
                />
                <br />
                <label name="expiryDateLVT">Expiry Date:</label>
                <input
                  type="date"
                  name="expiryDateLVT"
                  value={licenseData.expiryDateLVT}
                  onChange={handleChangeLVT}
                />
                <br />
                <label name="fileUploadLVT">Upload LVT License Document:</label>
                <div className="file-upload">
                  <label className="file-upload-btn" htmlFor="fileUploadLVT">
                    Choose File
                  </label>
                  <span className="file-name">
                    {licenseData.fileUploadLVT
                      ? licenseData.fileUploadLVT.name
                      : "No file selected"}
                  </span>
                  <input
                    type="file"
                    id="fileUploadLVT"
                    name="fileUploadLVT"
                    accept="image/*,.pdf"
                    onChange={handleLVTFileChange}
                  />
                </div>
                <br />
                <button onClick={handleSaveLVTClick}>Save</button>
              </>
            )
          ) : (
            <button onClick={handleVerifyLVTClick}>Verify ID</button>
          )}

          {/* {daysLVTLeft !== null && (
                    <>
                    <p>License ID: {licenseData.licenseLVTNumber}</p>
                    <p>Expiry Date: {licenseData.expiryDateLVT}</p>
                    <p>Days Left Until Expiry: {daysLVTLeft}</p>
                    </>
                )} */}
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
