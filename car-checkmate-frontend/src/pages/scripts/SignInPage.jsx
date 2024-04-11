import React, { useState } from 'react';
import '../styles/SignInPage.css';

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Data:", formData);
        // Add your form submission logic here
    };

    return(
        <div className='sign-in-container'>
            <div className='heading'>
                <h3>carcheckmate.com.au</h3>
            </div>
            <form className="sign-in-form" onSubmit={handleSubmit}>
                <h3>Sign In</h3>

                <div className='credentails--container'>
                    <div className='sign-in-input-box'>
                    <label>Email</label>
                        <input
                            type="email"   
                            onChange={handleChange}
                            name="email"
                            value={formData.email}
                        />
                    </div>
             
                    <div className='sign-in-input-box'>
                        <label>Password</label>
                            <input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                value={formData.password}
                            />
                    </div>
                    <div className="forgot-password-container">
                         <p className="forgot-password">Forgot Password?</p>
                    </div>
            </div>
            <button className="login--button"type="submit">Log In</button>
            <p>Don't have an account? SignUp</p>
            </form>
            
        </div>
    )
}