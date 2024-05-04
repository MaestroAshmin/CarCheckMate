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

  useEffect(() => {
    const fetchInspectionData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/inspections/inspections-accepted-mechanic', {
          params: {
            inspectionDate: '2024-05-20', // Replace with the desired inspection date
            inspectionTime: '11:00 AM' // Replace with the desired inspection time
          }
        });
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching inspection data:', error);
      }
    };

    fetchInspectionData();
  }, []);

  const openEmailBuyerPopup = () => {
    setShowEmailBuyerPopup(true);
  };

  const openCancelPopup = () => {
    setShowCancelPopup(true);
  };

  return (
    <div>
      <EmailBuyerPopup showEmailBuyerPopup={showEmailBuyerPopup} setShowEmailBuyerPopup={setShowEmailBuyerPopup} />
      <CancelPopup showCancelPopup={showCancelPopup} setShowCancelPopup={setShowCancelPopup} />
      {schedules.map((schedule, index) => (
        <div key={index} className='ctr-schedule'>
          <div className='ctr-schedule-buyer-detail'>
            <h3>Car ID: <span>{schedule.carId}</span></h3>
            <p>Name: <span>{schedule.name}</span></p>
            <p>Date: <span>{schedule.inspectionDate}</span> Time: <span>{schedule.inspectionTime}</span></p>
            <p>Location: <span>{schedule.location}</span></p>
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