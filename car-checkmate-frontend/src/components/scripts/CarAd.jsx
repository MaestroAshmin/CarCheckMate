import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/carlist.css';

export default function CarAd({ car }) {
    const navigate = useNavigate();

    const handleCarClick = () => {
        // Navigate to the CarInfoPage when a car is clicked
        navigate(`/car/${car.id}`);
    };

    return (
        <div className="ctr-car-ad" onClick={handleCarClick}>
            <div className="ctr-car-ad-photo">
                <img src={car.image} alt={car.make} className="car-ad-photo" />
            </div>
            <div className="ctr-car-info">
                <div className="make-model">
                    <h3>{car.make} {car.model}</h3>
                </div>
                <div className="year-price">
                    <p>Year: {car.year}</p>
                    <p>Price: ${car.price}</p>
                </div>
            </div>
        </div>
    );
}