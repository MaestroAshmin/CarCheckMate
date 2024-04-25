import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CarData from './CarData.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/MechanicPage.css';
import Navbar from '../../components/scripts/navbar';
import Footer from '../../components/scripts/footer';



export default function MechanicPage() {
    const [data, setData] = useState([]);
    const { itemId } = useParams();
    const carId = parseInt(itemId);

    const [car, setCar] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        setData(CarData); // Add status field to each item
    }, []);

    useEffect(() => {
        const selectedCar = data.find(item => item.id === carId);
        setCar(selectedCar);
    }, [carId, data]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleConfirmBooking = () => {
        // console.log(
        //     car.id,
        //     car.name,
        //     car.DriversLicenseNumber,
        //     car.DateofCommencement,
        //     car.PhoneNumber,
        //     selectedDate,
        //     comment
        // );
    };

    return (
        <div className='Mec-container'>
            <Navbar />
            <h2>Car Details</h2>
            <div className="mec-details">
                {car ? (
                    <div className='mec-info'>
                        <p className='para'><strong>Car ID: </strong>{car.id}</p>

                        <div className='div2'>
                            <p className='para'><strong>Make: </strong>{car.make}</p>
                            <p className='para'><strong>Model:</strong> {car.model}</p>
                        </div>
                        <h4>Address: </h4>
                        <div className='div2'>
                            <p className='para'><strong>Street:</strong> {car.street}</p>
                            <p className='para'><strong>Suburb:</strong> {car.suburb}</p>
                        </div>
                        <div className='div2'>
                            <p className='para'><strong>Postcode:</strong> {car.postcode}</p>
                            <p className='para'><strong>State:</strong> {car.state}</p>
                        </div>
                        <h4>Features: </h4>
                        <div className='div2'>
                            <p className='para'><strong>Color:</strong> {car.color}</p>
                            <p className='para'><strong>Odometer:</strong> {car.odometer}</p>
                        </div>
                        <div className='div2'>
                            <p className='para'><strong>Transmission:</strong> {car.transmission}</p>
                            <p className='para'><strong>Year:</strong> {car.year}</p>
                        </div>
                        <div className='div2'>
                            <p className='para'><strong>Engine type:</strong> {car.engine_type}</p>
                            <p className='para'><strong>Fuel type:</strong> {car.fuel_type}</p>
                        </div>
                        <div className='div2'>
                            <p className='para'><strong>Body type:</strong> {car.body_type}</p>
                            <p className='para'><strong>Price:</strong> {car.price}</p>
                        </div>
                    </div>
                ) : (
                    <p>No car found with the specified ID.</p>
                )}
            </div>
            <div className='date-container'>
                <h3>Select Date and Time</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy; hh:mm"
                    placeholderText='mm/dd/yyyy hh:mm'
                    showTimeSelect
                    timeIntervals={15}
                    timeFormat='h:mm aa'
                    className='datepicker'
                />
            </div>
             
            <button className="button-81" role="button" onClick={handleConfirmBooking}>Confirm Booking</button>
            <Footer />
        </div>
    );
}
