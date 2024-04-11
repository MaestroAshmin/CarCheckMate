import React, { useState } from 'react';
import '../styles/SignUpPage.css';
export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone:"",
        password: "",
        confirmPassword: "",
        register: ""
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

    return (
      
        <div className='form--container'>
        <div className='heading'>
            <h3>carcheckmate.com.au</h3>
        </div>
        <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className='two-by-2'>
            <div className='input-box'>
                <label> First Name</label>
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
            <div >
            <p>Register as</p>

            <div className='radio'>
                <div>
                    <input 
                        type="radio"
                        name="register"
                        value="buyer"
                        onChange={handleChange}
                    />
                    <label>Buyer</label>
                </div>
                <div>
                    <input 
                        type="radio"
                        name="register"
                        value="seller"
                        onChange={handleChange}
                    />
                    <label>Seller</label>
                </div>
                <div>
                    <input 
                        type="radio"
                        name="register"
                        value="mechanic"
                        onChange={handleChange}
                    />
                    <label>Mechanic</label>
                </div>
                </div>
            </div>
            
            <button className="signup--button"type="submit">Create an Account</button>
        </form>
        </div>
        
    );
}
