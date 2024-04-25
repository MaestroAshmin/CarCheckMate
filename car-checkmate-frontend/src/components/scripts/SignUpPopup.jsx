import {useState} from "react";
import { signUp } from "../../ApiOperation/ApisManagement/user"

export default function SignUpPopup({ showSignUpPopup, setShowSignUpPopup, openSignInPopup }) {
    const formInitialValues = { firstName: "", lastName: "", email: "", mobileNumber: "" , password:"",confirmPassword:"", userType:""};
    let [formData, setFormData] = useState(formInitialValues);

    const onInputFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const registerUserApiCall = async ()=>{
        for(let item of Object.values(formData)){
            if(item == "" || item == " "){
                console.log("All the feilds are required")
            }
        }
        const signUpResponse = await signUp(formData);

        console.log("signUpResponse",signUpResponse)
        
    }
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
                            <form>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerFirstname'>First Name:</label>
                                    <input type='text' id='registerFirstname' name='firstName' placeholder='First Name' onChange={onInputFieldChange} required />
                                    <label htmlFor='registerLastname'>Last Name:</label>
                                    <input type='text' id='registerLastname' name='lastName' placeholder='Last Name' onChange={onInputFieldChange} required />
                                </div>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerEmail'>Email:</label>
                                    <input type='email' id='registerEmail' name='email' placeholder='Email' onChange={onInputFieldChange} required />
                                    <label htmlFor='registerPhone'>Phone:</label>
                                    <input type='tel' id='registerPhone' name='mobileNumber' placeholder='Phone' onChange={onInputFieldChange} required />
                                </div>
                                <div className='ctr-register-info'>
                                    <label htmlFor='registerPassword'>Password:</label>
                                    <input type='password' id='registerPassword' name='password' placeholder='Password' onChange={onInputFieldChange} required />
                                    <label htmlFor='registerConfirmPassword'>Confirm Password:</label>
                                    <input type='password' id='registerConfirmPassword' name='confirmPassword' placeholder='Confirm Password' onChange={onInputFieldChange} required />
                                </div>
                                <div className='role-container'>
                                    <fieldset name="userType" onChange={onInputFieldChange}>
                                        <legend>Type:</legend>
                                        <div className='role-radio'>
                                            <input type='radio' id='radBuyer' name='userType' value='buyer' defaultChecked />
                                            <label htmlFor='radBuyer'>Buyer</label>
                                        </div>
                                        <div className='role-radio'>
                                            <input type='radio' id='redSeller' name='userType' value='seller' />
                                            <label htmlFor='redSeller'>Seller</label>
                                        </div>
                                        <div className='role-radio'>
                                            <input type='radio' id='radMechanic' name='userType' value='mechanic' />
                                            <label htmlFor='radMechanic'>Mechanic</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className='button-container'>
                                    <button onClick={registerUserApiCall} >Create Account</button>
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