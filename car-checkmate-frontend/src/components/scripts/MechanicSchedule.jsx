import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EmailBuyerPopup from './EmailBuyerPopup';
import CancelPopup from './CancelPopup';

function MechanicSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [showEmailBuyerPopup, setShowEmailBuyerPopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [mechanic, setMechanic] = useState("");

  console.log(schedules); 

  const fetchInspectionData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/inspections/inspections-accepted-mechanic/${mechanic}`);
      
      setSchedules(response.data.inspectionsWithCarDetails)
      // Set fetched data into schedules state
    } catch (error) {
      console.error('Error fetching inspection data:', error);
    }
  };
  
  const loadMechanicIdFromLocalStorage = () => {
    const userDataFromLocalStorage = localStorage.getItem('user');
    if (userDataFromLocalStorage) {
        const userData = JSON.parse(userDataFromLocalStorage);
        if (userData._id) {
            setMechanic(userData._id);
        }
    }
};

useEffect(() => {
  loadMechanicIdFromLocalStorage();
}, []);

useEffect(() => {
  if (mechanic) { // Ensure mechanic ID is available before fetching data
    fetchInspectionData();
  }
}, [mechanic]); // Trigger when mechanic ID changes

  const openEmailBuyerPopup = () => {
    setShowEmailBuyerPopup(true);
  };

  const openCancelPopup = () => {
    setShowCancelPopup(true);
  };

  const handleimages = (photos) => {
    
    const carPhotosArray = Array.isArray(photos) ? photos : [];

    // Trim each file path to remove leading and trailing whitespace
    carPhotosArray.map(filePath => {
        const trimmedFilePath = filePath.trim();
        const parts = trimmedFilePath.split('\\');
       
        console.log(parts[parts.length - 1])  
        return parts[parts.length - 1];
      
    });
};


  return (
    <div>
      
      <EmailBuyerPopup showEmailBuyerPopup={showEmailBuyerPopup} setShowEmailBuyerPopup={setShowEmailBuyerPopup} />
      <CancelPopup showCancelPopup={showCancelPopup} setShowCancelPopup={setShowCancelPopup} />
      {schedules.map((schedule, index) => (
        <div key={index} className='ctr-schedule'>
          <img src={schedule.car.carPhotos[0]} alt="Car" />
          <div className='ctr-schedule-buyer-detail'>
          
          
            <h3>Car: <span>{schedule.car.make}</span> <span>{schedule.car.model}</span></h3>
            {/* <p>Name: <span>{schedule.name}</span></p> */}
            
            
            <p>Date: <span>{schedule.inspectionDate.slice(0, 10)}</span><br/> <br/>  Time: <span>{schedule.inspectionTime}</span></p>
            <p>Location:<span>{schedule.car.streetName}</span> <span>{schedule.car.suburb} </span> <span>{schedule.car.state} </span><span>{schedule.car.postcode} </span></p>
          </div>
          <div className='ctr-schedule-option'>
            <button onClick={openEmailBuyerPopup}>Email Buyer</button>
            <button><Link to='/InspectionReport'>Create A Report</Link></button>
            <button onClick={openCancelPopup}>Cancel booking</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MechanicSchedule;