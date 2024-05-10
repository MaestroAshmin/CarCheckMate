import React from "react";

export default function ForgotPasswordPopup({ showForgotPassPopup, setShowForgotPassPopup }) {
    async function handleforgotPassword(e){
        e.preventDefault();
        const email = e.target.forgotEmail.value;
       console.log("email", email)
        try {
            await fetch("http://localhost:3000/user/forgotpassword", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email:email}),
            });
            e.target.forgotEmail.value = "";
        } catch (error) {
            console.log("Error while submitting form", error);
        }  
        
    }

    return (
        <>
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