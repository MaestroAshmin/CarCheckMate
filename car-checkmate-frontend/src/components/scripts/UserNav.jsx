import { useState } from 'react';
import { Link } from 'react-router-dom';

function UserNav() {
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className='ctr-user-type'>
            <span className={`nav-item ${activeItem === 'userProfile' ? 'active' : ''}`} onClick={() => handleItemClick('userProfile')}>
                <Link to='/UserProfile'>User Profile</Link>
            </span>
            <span className={`nav-item ${activeItem === 'buyer' ? 'active' : ''}`} onClick={() => handleItemClick('buyer')}>
                {activeItem !== 'buyer' && <span className="lock-icon">🔒</span>}
                <Link to='/Buyer'>Buyer</Link>
            </span>
            <span className={`nav-item ${activeItem === 'seller' ? 'active' : ''}`} onClick={() => handleItemClick('seller')}>
                {activeItem !== 'seller' && <span className="lock-icon">🔒</span>}
                <Link to='/Seller'>Seller</Link>
            </span>
            <span className={`nav-item ${activeItem === 'mechanic' ? 'active' : ''}`} onClick={() => handleItemClick('mechanic')}>
                {activeItem !== 'mechanic' && <span className="lock-icon">🔒</span>}
                <Link to='/Mechanic'>Mechanic</Link>
                <span className="icon">
                    <span className="subicon">3</span>
                </span>
            </span>
       </div>
    );
}

export default UserNav;
