import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import '../styles/CarAdPage.css';
import CarBuildPage from './CarBuildPage';
import CarFeaturePage from './CarFeaturePage';
import CarPhotoPage from './CarPhotoPage';
import CarLocationPage from './CarLocationPage';
import CarPricePage from './CarPricePage';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../../components/scripts/HeaderNav';
import Footer from '../../components/scripts/footer';
import UserNav from '../../components/scripts/UserNav';
import ResponsePopup from '../../components/scripts/ResponsePopup';

export default function CarAdPage() {
    const [page, setPage] = useState(0);
    const [isSeller, setIsSeller] = useState(false); // Flag to indicate if the user is a seller
    const navigate = useNavigate();

    const [showResponsePopup, setShowResponsePopup] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const openResponsePopup = (message) => {
        setResponseMessage(message);
        setShowResponsePopup(true);
    };

    const initialCarPhotos = {};
    for (let i = 0; i < 20; i++) {
        initialCarPhotos[`carPhoto[${i}]`] = null;
    }
    const [formData, setFormData] = useState({
        seller_id: "",
        registrationNo: "",
        make:"",
        model:"",
        state:"",
        year:"",
        streetName:"",
        suburb:"",
        postcode:"",
        price:"",
        color:"",
        odometer:"",
        transmission:"",
        fuelType:"",
        engineType:"",
        bodyType:"",
        ...initialCarPhotos, // Add the initial carPhoto fields
    });
    useEffect(() => {
        // Retrieve user data from local storage
        const userDataFromLocalStorage = localStorage.getItem('user');
        if (userDataFromLocalStorage) {
            // Parse the user data to JSON
            const userData = JSON.parse(userDataFromLocalStorage);
            // Check if user data contains _id
            if (userData._id) {
                // Update the formData state with the retrieved _id
                setFormData(prevFormData => ({
                    ...prevFormData,
                    seller_id: userData._id
                }));
            }
            // Check if user is not a seller and redirect to homepage
            if (!userData.seller) {
                window.location.href = '/'; // Redirect to homepage
            }
            else{
                setIsSeller(true);
            }
        }
    }, []);

    const FormPages = ["CarBuildPage","CarFeaturePage","CarLocationPage","CarPhotoPage","CarPricePage"];

    const PageDisplay = () => {
        if(page === 0){
            return <CarBuildPage formData={formData} setFormData={setFormData} />;
        } else if (page === 1){
            return <CarFeaturePage formData={formData} setFormData={setFormData} />;
        } else if (page === 2){
            return <CarLocationPage formData={formData} setFormData={setFormData} />;
        } else if (page === 3){
            return <CarPhotoPage formData={formData} setFormData={setFormData} />;
        } else if (page === 4){
            return <CarPricePage formData={formData} setFormData={setFormData} />;
        }
    };

    const progress = ((page + 1) / FormPages.length) * 100;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);
        // console.log(formData);
        // Create a FormData object
        const formDataToSend = new FormData();
        // Append all fields from formData to formDataToSend
        for (const key in formData) {
            // If the field starts with "carPhoto" and is not null, append it
            if (key.startsWith('carPhoto') && formData[key] !== null) {
                formDataToSend.append(key, formData[key]);
            } else {
                // Append other fields normally
                formDataToSend.append(key, formData[key]);
            }
        }
        try{

            // Make API call to send form data
            const response = await fetch('http://localhost:3000/cars/upload-car-details', {
                method: 'POST',
                credentials: 'include',
                body: formDataToSend, // Use FormData object as the body
            });
            console.log(response);
            // Check if response is ok
            if (!response.ok) {
                const responseData = await response.json();
                console.log('Error', responseData);
                throw new Error(responseData.error); 
            }
            
            openResponsePopup("Listing the car successfully!");
            // Navigate to UserProfile if response is ok
            //navigate('/UserProfile');
        } catch (error) {
            setIsLoading(false);
            if (error.message) {
                setError(error.message); // Use error message from thrown error
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
            // console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className='ctr-main'>

            <ResponsePopup
                message={responseMessage}
                showResponsePopup={showResponsePopup}
                setShowResponsePopup={setShowResponsePopup}
            />

            <div className='ctr-sub-content'>
                <HeaderNav />
                <div className='ctr-content-session'>
                <UserNav />
                <p className='user-title'>S e l l e r</p>
                <div className='ctr-user-content'>
                    <div className='ctr-user-content-block'>
                        <h3>Create A New Car Listing</h3>
                            <div className="form">
                                
                                <div className="form-container">
                                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                                    {PageDisplay()}
                                </div>
                                <div className='footer--button'>
                                    {page === 0 ? (
                                        <button class="button-31" role="button"
                                            disabled={page === FormPages.length - 1}
                                            onClick={() => setPage((currPage) => currPage + 1)}
                                        >Next</button>
                                    ) : (
                                        <>
                                            <button class="button-6" role="button"
                                                onClick={() => setPage((currPage) => currPage - 1)}
                                            >Prev</button>
                                            <button class="button-31" role="button"
                                                onClick={() => {
                                                if (page === FormPages.length - 1) {
                                                    handleSubmit();
                                                } else {
                                                    setPage((currPage) => currPage + 1);
                                                }
                                                }}
                                            >
                                                {page === FormPages.length - 1 ? "Submit" : "Next"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
}
