import { useState } from "react";
import React from "react";
import ResponsePopup from "./ResponsePopup";

export default function ForgotPasswordPopup({ showForgotPassPopup, setShowForgotPassPopup }) {

    const [showResponsePopup, setShowResponsePopup] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    const openResponsePopup = (message) => {
        setResponseMessage(message);
        setShowResponsePopup(true);
        setShowForgotPassPopup(false);
    };

    async function handleforgotPassword(e){
        e.preventDefault();
        const email = e.target.forgotEmail.value;
        openResponsePopup("Email has been sent. Please check your inbox.");
    
        try {
            const response = await fetch("http://localhost:3000/user/forgotpassword", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email:email}),
            });
    
            if(response.ok) {
                e.target.forgotEmail.value = "";
            } else {
                throw new Error("Failed to send email");
            }
        } catch (error) {
            console.log("Error while submitting form", error);
        }
    }

    return (
        <>
            <ResponsePopup
                message={responseMessage}
                showResponsePopup={showResponsePopup}
                setShowResponsePopup={setShowResponsePopup}
            />

            {showForgotPassPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowForgotPassPopup(false)}>&times;</span>
                            <h2>Forgot Your Password?</h2>
                            <p>Please enter your email address below to reset your password.</p>
                            <br />
                            <form onSubmit={handleforgotPassword}>
                                <label htmlFor='forgotEmail'>Email:</label>
                                <input type='email' id='forgotEmail' name='forgotEmail' placeholder='Email' required />
                                <div className='button-container'>
                                    <button type='submit'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
