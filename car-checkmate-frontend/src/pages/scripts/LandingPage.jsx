import React, { useEffect, useState, useContext } from 'react';
import '../styles/LandingPage.css'

export default function Dashboard() {
    return(


        <div>
        <div>
            <img className="background" src="background.jpg"/>
        </div>
        <div className="container">
            <div className='welcome--container'>
            <h1>Welcome to</h1>
            <h1>Car CheckMate</h1>
            </div>
            <div className='button--container'>
            <button>Continue as a guest</button>
            <div className='sign--in'>
            <h6>Already have an account ?</h6>
            <button>Sign In</button>
            </div>
            <button>Signup</button>
            </div>
        </div>
        </div>
    )
}