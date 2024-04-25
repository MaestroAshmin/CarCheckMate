import { useState } from 'react';

function UserNav() {
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className='ctr-user-type'>
            <span className={`nav-item ${activeItem === 'buyer' ? 'active' : ''}`} onClick={() => handleItemClick('buyer')}>
                {activeItem !== 'buyer' && <span className="lock-icon">🔒</span>}
                <a href="#">Buyer</a>
            </span>
            <span className={`nav-item ${activeItem === 'seller' ? 'active' : ''}`} onClick={() => handleItemClick('seller')}>
                {activeItem !== 'seller' && <span className="lock-icon">🔒</span>}
                <a href="#">Seller</a>
            </span>
            <span className={`nav-item ${activeItem === 'mechanic' ? 'active' : ''}`} onClick={() => handleItemClick('mechanic')}>
                {activeItem !== 'mechanic' && <span className="lock-icon">🔒</span>}
                <a href="#">Mechanic</a>
                <span className="icon">
                    <span className="subicon">3</span>
                </span>
            </span>
       </div>
    );
}

export default UserNav;
