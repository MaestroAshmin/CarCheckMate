import React, { useState } from 'react';
import '../styles/SignUpPage.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        register: "",
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
        <div className='form--container'>
            <div className='heading'>
                <h3>carcheckmate.com.au</h3>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <div className='two-by-2'>
                    <div className='input-box'>
                        <label>First Name</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="firstName"
                            value={formData.firstName}
                            className='input-field'
                        />
                    </div>
                    <div className='input-box'>
                        <label>Last Name</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="lastName"
                            value={formData.lastName}
                        />
                    </div>
                </div>
                <div className='two-by-2'>
                    <div className='input-box'>
                        <label>Email</label>
                        <input
                            type="email"
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                        />
                    </div>
                    <div className='input-box'>
                        <label>Phone</label>
                        <input
                            type="text"
                            onChange={handleChange}
                            name="phone"
                            value={formData.phone}
                        />
                    </div>
                </div>
                <div className='two-by-2'>
                    <div className='input-box'>
                        <label>Password</label>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="password"
                            value={formData.password}
                        />
                    </div>
                    <div className='input-box'>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            onChange={handleChange}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                        />
                    </div>
                </div>
                <div>
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        onChange={handleChange}
                        name="mobileNumber"
                        value={formData.mobileNumber}
                    />
                </div>
                <div>
                    <label>User Type</label>
                    <select
                        onChange={handleChange}
                        name="userType"
                        value={formData.userType}
                    >
                        <option value="">Select user type</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                        <option value="mechanic">Mechanic</option>
                    </select>
                </div>
                <button className="signup--button" type="submit">Create an Account</button>
            </form>
        </div>
    );
}