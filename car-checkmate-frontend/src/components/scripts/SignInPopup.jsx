import { useState} from "react";
import { signIn } from "../../ApiOperation/ApisManagement/user";

export default function SignInPopup({ showSignInPopup, setShowSignInPopup, openForgotPassPopup, openSignUpPopup }) {
    const formInitialValues = { email: "", password: ""};
    let [formData, setFormData] = useState(formInitialValues);

    const onInputFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const loginUserApiCall = async ()=>{
        for(let item of Object.values(formData)){
            if(item == "" || item == " "){
                console.log("All the feilds are required")
            }
        }
        const signInResponse = await signIn(formData);

        console.log("signUpResponse",signInResponse)
        
    }

    return (
        <>
            {showSignInPopup && (
                <>
                    <div className='overlay'></div>
                    <div className='popup'>
                        <div className='popup-content'>
                            <span className='close' onClick={() => setShowSignInPopup(false)}>&times;</span>
                            <h2>Sign In</h2>
                            <p>Enter email and password to sign in</p>
                            <br />
                            <form>
                                <label htmlFor='loginEmail'>Email:</label>
                                <input type='email' id='loginEmail' name='email' placeholder='Email' onChange={onInputFieldChange} required />
                                <label htmlFor='loginPassword'>Password:</label>
                                <input type='password' id='loginPassword' name='password' placeholder='Password' onChange={onInputFieldChange} required />
                                <br />
                                <span className='link-forgot-pass' onClick={openForgotPassPopup}>Forgot Password?</span>
                                <div className='button-container'>
                                    <button type='submit' onClick={loginUserApiCall}>Log In</button>
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