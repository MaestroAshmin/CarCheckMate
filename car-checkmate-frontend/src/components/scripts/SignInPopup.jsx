import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SignInPopup({ showSignInPopup, setShowSignInPopup, openForgotPassPopup, openSignUpPopup }) {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                body: formData,
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                // Handle successful login
                setShowSignInPopup(false);
                // Optionally, redirect or update app state
                const data = await response.json();
                // console.log(data);
                localStorage.setItem('user', JSON.stringify(data.user));
                // navigate('/Homepage');
                window.location.href = '/Homepage';
            } else {
                const data = await response.json();
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred while processing your request');
            console.error('Error:', error);
        }
    };

    return (
        <>
            {showSignInPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowSignInPopup(false)}>&times;</span>
                            <h2>Sign In</h2>
                            {error && <p className='error-message'>{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <label htmlFor='loginEmail'>Email:</label>
                                <input
                                    type='email'
                                    id='loginEmail'
                                    name='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor='loginPassword'>Password:</label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <br />
                                <span className='link-forgot-pass' onClick={openForgotPassPopup}>Forgot Password?</span>
                                <div className='button-container'>
                                    <button type='submit'>Log In</button>
                                </div>
                            </form>
                            <p className='popup-link-align-right'>Don't have an account yet? <span onClick={openSignUpPopup}>Sign Up</span></p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}