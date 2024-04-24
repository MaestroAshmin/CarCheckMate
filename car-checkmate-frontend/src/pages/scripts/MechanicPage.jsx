import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import mechanicsData from './Mechanics.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/MechanicPage.css';
import Navbar from '../../components/scripts/navbar';
import Footer from '../../components/scripts/footer';

export default function MechanicPage() {
    const [mechanic, setMechanic] = useState(null);
    const { itemId } = useParams();
    const [selectedDate, setselectedDate] = useState(null);
    const [comment,setComment] = useState("");

    const handleDateChange = (date) => {
      setselectedDate(date);
    };

    const  handleConfirmBooking = () => {
         console.log(
            mechanic.id, 
            mechanic.name,
            mechanic.DriversLicenseNumber,
            mechanic.DateofCommencement,
            mechanic.PhoneNumber,
            selectedDate,
            comment
        )
      };

    useEffect(() => {
        const selectedMechanic = mechanicsData.find(mechanic => mechanic.id === parseInt(itemId));
        setMechanic(selectedMechanic);
    }, [itemId]);

    return (
        <div className='Mec-container'>
            <Navbar />
            <h2>Mechanic Details</h2>
            <div className="mec-details">
                {mechanic ? (
                    <div>
                        <p  className='para'><strong>Mechanic ID: </strong>{mechanic.id}</p>
                        <p className='para'><strong>Name: </strong>{mechanic.name}</p>
                        <p className='para'><strong>Driver's License:</strong> {mechanic.DriversLicenseNumber}</p>
                        <p className='para'><strong>Date of Commencement:</strong> {mechanic.DateofCommencement}</p>
                        <p className='para'><strong>Phone Number:</strong> {mechanic.PhoneNumber}</p>
                    </div>
                ) : (
                    <p>No mechanic found with the specified ID.</p>
                )}
            </div>
            <div>
            <div className='date-container'>
                <h3>Select Date and Time</h3>
            
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy; hh:mm "
                    placeholderText='mm/dd/yyyy hh:mm'
                    showTimeSelect
                    timeIntervals ={15}
                    timeFormat='h:mm aa'
                    className='datepicker'
                />
            </div>
 
            </div>
            <div className='comment-container'>
            <h3><strong>Comment</strong></h3>
            <input
                type="text"   
                name="comment"   
                className='comment-input'  
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value );
                }} 
            />
            </div>
            <button className="button-81" role="button" onClick={() => handleConfirmBooking()}>Confirm Booking</button>
            <Footer/>
        </div>
    );
}
