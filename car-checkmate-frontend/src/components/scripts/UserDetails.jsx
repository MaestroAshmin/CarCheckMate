import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function UserDetails() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: 'Joan Smith',
        phone: '04xx xxx xxx',
        email: 'John@mail.com',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveClick = () => {
        // Implement save functionality here
        setIsEditing(false);
    };

    return (
        <div className='ctr-user-details'>
            <div className='ctr-user-details-edit'>
                {isEditing ? (
                    <form>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />

                        <p>Change Password:</p>

                        <input type="password" name="currentPassword" placeholder="Current Password" value={formData.currentPassword} onChange={handleChange} />
                        <input type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} />
                        <input type="password" name="confirmNewPassword" placeholder="Confirm New Password" value={formData.confirmNewPassword} onChange={handleChange} />
                        <button type="button" onClick={handleSaveClick}>Save</button>
                    </form>
                ) : (
                    <>
                        <p><span>{formData.name}</span></p>
                        <p><span>{formData.phone}</span></p>
                        <p><span>{formData.email}</span></p>
                        <button onClick={handleEditClick}>
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </>
                )}
            </div>

        </div>
    );
}

export default UserDetails;
