import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function UserNav() {
    const [activeItem, setActiveItem] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const location = useLocation();

    const handleItemClick = (item) => {
        setActiveItem(item);
        localStorage.setItem('activeItem', item); // Store active item in local storage
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

        // Initialize active item from local storage
        const storedActiveItem = localStorage.getItem('activeItem');
        if (storedActiveItem) {
            setActiveItem(storedActiveItem);
        }
    }, []);

    const isUserInRole = (role) => userRoles.includes(role);

    return (
        <div className='ctr-user-type'>
            <span className={`nav-item ${activeItem === 'profile' ? 'active' : ''}`}>
                <Link to='/UserProfile' onClick={() => handleItemClick('profile')}>
                    Profile
                </Link>
            </span>
            <span className={`nav-item ${activeItem === 'buyer' ? 'active' : ''}`}>
                {isUserInRole('buyer') ? (
                    <Link to='/Buyer' onClick={() => handleItemClick('buyer')}>
                        Buyer
                    </Link>
                ) : (
                    <span className="lock-icon">🔒 Buyer</span>
                )}
            </span>
            <span className={`nav-item ${activeItem === 'seller' ? 'active' : ''}`}>
                {isUserInRole('seller') ? (
                    <Link to='/Seller' onClick={() => handleItemClick('seller')}>
                        Seller
                    </Link>
                ) : (
                    <span className="lock-icon">🔒 Seller</span>
                )}
            </span>
            <span className={`nav-item ${activeItem === 'mechanic' ? 'active' : ''}`}>
                {isUserInRole('mechanic') ? (
                    <Link to='/Mechanic' onClick={() => handleItemClick('mechanic')}>
                        Mechanic
                    </Link>
                ) : (
                    <span className="lock-icon">🔒 Mechanic</span>
                )}
            </span>
        </div>
    );
}

export default UserNav;
