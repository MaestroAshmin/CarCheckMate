import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
    const [activeItem, setActiveItem] = useState('');
    const [userRoles, setUserRoles] = useState([]);

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    useEffect(() => {
        // Retrieve user data from local storage
        const userDataFromLocalStorage = localStorage.getItem('user');
        if (userDataFromLocalStorage) {
            // Parse the user data to JSON
            const userData = JSON.parse(userDataFromLocalStorage);
            // Check if user is authenticated and has roles
            if (userData) {
                const roles = [];
                if (userData.buyer) roles.push('buyer');
                if (userData.seller) roles.push('seller');
                if (userData.mechanic) roles.push('mechanic');
                setUserRoles(roles);
            }
        }
    }, []);

   const isUserInRole = (role) => userRoles.includes(role);

    return (
        <div className='ctr-user-type'>
            <span className={`nav-item ${isUserInRole('user') ? 'active' : ''}`}>
                <Link to='/UserProfile'>User Profile</Link>
            </span>
            <span className={`nav-item ${isUserInRole('buyer') ? 'active' : ''}`}>
                {isUserInRole('buyer') ? (
                    <Link to='/Buyer'>Buyer</Link>
                ) : (
                    <span className="lock-icon">🔒 Buyer</span>
                )}
            </span>
            <span className={`nav-item ${isUserInRole('seller') ? 'active' : ''}`}>
                {isUserInRole('seller') ? (
                    <Link to='/Seller'>Seller</Link>
                ) : (
                    <span className="lock-icon">🔒 Seller</span>
                )}
            </span>
            <span className={`nav-item ${isUserInRole('mechanic') ? 'active' : ''}`}>
                {isUserInRole('mechanic') ? (
                    <Link to='/Mechanic'>Mechanic</Link>
                ) : (
                    <span className="lock-icon">🔒 Mechanic</span>
                )}
            </span>
        </div>
    );
}

export default UserNav;
