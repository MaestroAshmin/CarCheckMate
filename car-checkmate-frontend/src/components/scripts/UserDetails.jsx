import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function UserDetails() {
    const [isProfileEditing, setIsProfileEditing] = useState(false);
    const [isAvailabilityEditing, setIsAvailabilityEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        name: 'Joan Smith',
        phone: '04xx xxx xxx',
        email: 'John@mail.com',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [availabilityData, setAvailabilityData] = useState({
        availabilities: {
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
            Sunday: false
        }
    });

    const handleProfileEditClick = () => {
        setIsProfileEditing(true);
    };

    const handleAvailabilityEditClick = () => {
        setIsAvailabilityEditing(true);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;

        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleAvailabilityChange = (e) => {
        const { name, checked } = e.target;
        
        setAvailabilityData((prevData) => ({
            ...prevData,
            availabilities: {
                ...prevData.availabilities,
                [name]: checked
            }
        }));
    };
    

    const handleProfileSaveClick = () => {
        // Implement save functionality here
        setIsProfileEditing(false);
    };

    const handleAvailabilitySaveClick = async () => {
        // console.log("form-data ", formData)
        // try{ await fetch("http://localhost:3000/",{
        //     method:"POST", 
        //     headers:{
        //         "Content-Type" : "application/json",

        //     },
        //     body:JSON.stringify(formData)

        // })
            
        // } catch (error) {
        //     console.log("error while changing password : ", error)
        // }
        // // Implement save functionality here
        // setIsAvailabilityEditing(false);
    };

    return (
        <div>
            <div className='ctr-user-details'>
                <div className='ctr-user-details-edit'>
                    {isProfileEditing ? (
                        <form>
                            <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
                            <input type="text" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                            <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} />

                            <p>Change Password:</p>

                            <input type="password" name="currentPassword" placeholder="Current Password" value={profileData.currentPassword} onChange={handleProfileChange} />
                            <input type="password" name="newPassword" placeholder="New Password" value={profileData.newPassword} onChange={handleProfileChange} />
                            <input type="password" name="confirmNewPassword" placeholder="Confirm New Password" value={profileData.confirmNewPassword} onChange={handleProfileChange} />
                            <button type="button" onClick={handleProfileSaveClick}>Save</button>
                        </form>
                    ) : (
                        <>
                            <p><span>{profileData.name}</span></p>
                            <p><span>{profileData.phone}</span></p>
                            <p><span>{profileData.email}</span></p>
                            <button onClick={handleProfileEditClick}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </>
                    )}
                </div>
            </div>
            <h3>Seller</h3>
            <div className='ctr-user-details'>
                <div className='ctr-user-details-edit'>
                    <p><b>Set up Availabilities for a car inspection</b></p>
                    <p><i>Inspection time is between 8:00 to 20:00</i></p>
                    {isAvailabilityEditing ? (
                        <form>
                            <p><i>* Please select unavailable days for inspection</i></p>
                            <div className='ctr-user-details-chk-availability'>
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                                    <label key={index}>
                                        <input type="checkbox" name={day} checked={availabilityData.availabilities[day]} onChange={handleAvailabilityChange} />
                                        {day}
                                    </label>
                                ))}
                            </div>
                            <button type="button" onClick={handleAvailabilitySaveClick}>Save</button>
                        </form>
                    ) : (
                        <>
                            <p><span>{Object.keys(availabilityData.availabilities).filter(key => availabilityData.availabilities[key]).join(', ')}</span></p>
                            <button onClick={handleAvailabilityEditClick}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
