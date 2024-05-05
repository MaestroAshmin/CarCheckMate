import {React, useState} from "react";

export default function SignUpPopup({ showSignUpPopup, setShowSignUpPopup, openSignInPopup }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNumber: "",
        userType: ""
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage(null);
        setError(null);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                body: formDataToSend
            });
            const responseData = await response.json(); // Parse response as JSON
            if (response.ok) {
                console.log('Registration successful');
                setSuccessMessage(responseData.message);
            } else {
                console.error('Registration failed');
                setError(responseData.error);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    };
    return (
        <>
            {showSignUpPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup-signup'>
                        <div className='popup-content-signup'>
                            <span className='close' onClick={() => setShowSignUpPopup(false)}>&times;</span>
                            <h2>Create a New Account</h2>
                            <p>Please fill in the following details:</p>
                            <form onSubmit={handleSubmit}>
                                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                                {successMessage && <p style={{ color: 'green', fontWeight: 'bold' }}>{successMessage}</p>}
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerFirstname'>First Name:</label>
                                    <input type='text' id='registerFirstname' name="firstName" onChange={handleChange} value={formData.firstName} placeholder='First Name' required />
                                    <label htmlFor='registerLastname'>Last Name:</label>
                                    <input type='text' id='registerLastname' onChange={handleChange} name="lastName" value={formData.lastName} placeholder='Last Name' required />
                                </div>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerEmail'>Email:</label>
                                    <input type='email' id='registerEmail' onChange={handleChange}name="email" value={formData.email} placeholder='Email' required />
                                    <label htmlFor='registerPhone'>Phone:</label>
                                    <input type='tel' id='registerPhone' onChange={handleChange} name="mobileNumber" value={formData.mobileNumber} placeholder='Phone' required />
                                </div>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerPassword'>Password:</label>
                                    <input type='password' id='registerPassword' onChange={handleChange} name="password" value={formData.password} placeholder='Password' required />
                                    <label htmlFor='registerConfirmPassword'>Confirm Password:</label>
                                    <input type='password' id='registerConfirmPassword' onChange={handleChange} name="confirmPassword" value={formData.confirmPassword} placeholder='Confirm Password' required />
                                </div>
                                <div className='role-container'>
                                    <fieldset>
                                    <legend>Type:</legend>
                                        <div className='role-radio'>
                                            <input 
                                                type='radio' 
                                                id='radBuyer' 
                                                name='userType' 
                                                value='buyer' 
                                                checked={formData.userType === 'buyer'} 
                                                onChange={handleChange} 
                                            />
                                            <label htmlFor='radBuyer'>Buyer</label>
                                        </div>
                                        <div className='role-radio'>
                                            <input 
                                                type='radio' 
                                                id='radSeller' 
                                                name='userType' 
                                                value='seller' 
                                                checked={formData.userType === 'seller'} 
                                                onChange={handleChange} 
                                            />
                                            <label htmlFor='radSeller'>Seller</label>
                                        </div>
                                        <div className='role-radio'>
                                            <input 
                                                type='radio' 
                                                id='radMechanic' 
                                                name='userType' 
                                                value='mechanic' 
                                                checked={formData.userType === 'mechanic'} 
                                                onChange={handleChange} 
                                            />
                                            <label htmlFor='radMechanic'>Mechanic</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className='button-container'>
                                    <button type='submit' >Create Account</button>
                                </div>
                            </form>
                            <p className='popup-link-align-right'>Already have an account? <span onClick={openSignInPopup}>Login</span></p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}