import React, { useState } from 'react';
import '../styles/ForgetPasswordPage.css';

export default function ForgetPasswordPage() {
    const [code, setCode] = useState("");

    // Function to handle change in the input field
    const handleChange = (event) => {
        setCode(event.target.value); // Update the code state with the new value
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Code:", code);
        // Add your form submission logic here
    };

    return(
        <div className='forget-container'>
            <div className='heading'>
                <h3>carcheckmate.com.au</h3>
            </div>
            <div className='forget-input-box'>
                <p>Verification code has been sent to your email.<br/><br/>PLEASE ENTER THE CODE HERE</p>
                <label> Code</label>
                <input
                    type="text"    
                    onChange={handleChange} // Call handleChange function on input change
                    name="code"
                    value={code}
                    className='code'
                />
                <button className='forget-submit-button' onClick={handleSubmit}>Submit</button>
            </div>
            
        </div>
    )
}
