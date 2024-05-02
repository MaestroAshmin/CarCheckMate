import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmailBuyerPopup from './EmailBuyerPopup';
import AddRWCPopup from './AddRWCPopup';
import CancelPopup from './CancelPopup';

function SellerSchedule() {
    const schedules = [
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
        },
        {
            carId: 'C1254',
            name: 'John Smith',
            date: '24/04/2024',
            time: '10:30 am',
        },
    ];

    const [showEmailBuyerPopup, setShowEmailBuyerPopup] = useState(false);
    const [showAddRWCPopup, setShowAddRWCPopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);

    const openEmailBuyerPopup = () => {
        setShowEmailBuyerPopup(true);
    };

    const openAddRWCPopup = () => {
        setShowAddRWCPopup(true);
    };

    const openCancelPopup = () => {
        setShowCancelPopup(true);
    };
    useEffect(()=>{
        async function fetchUpcomingInspections() {
        try {
            const userDataFromLocalStorage = localStorage.getItem('user');
            const userData = JSON.parse(userDataFromLocalStorage);
         const responseasupcomingseller = await fetch(`http://localhost:3000/inspections/upcoming-seller/${userData._id}`);
         const responsegetpastinspections = await fetch(`http://localhost:3000/inspections/past-seller/${userData._id}`);
        
         const dataupcoming = await responseasupcomingseller.json();
         const datagetpast = await responsegetpastinspections.json();
         //console.log("data: ", data)

        } catch (error) {
           console.log("error while fetching upcoming inspections: ",error); 
        }    
        }
        fetchUpcomingInspections()
    },[])

    return (
        <div>
            <EmailBuyerPopup
                showEmailBuyerPopup={showEmailBuyerPopup}
                setShowEmailBuyerPopup={setShowEmailBuyerPopup}
            />

            <AddRWCPopup
                showAddRWCPopup={showAddRWCPopup}
                setShowAddRWCPopup={setShowAddRWCPopup}
            />

            <CancelPopup
                showCancelPopup={showCancelPopup}
                setShowCancelPopup={setShowCancelPopup}
            />

            {schedules.map((schedule, index) => (
                <div key={index} className='ctr-schedule'>
                    <div className='ctr-schedule-buyer-detail'>
                        <h3>Car ID: <span>{schedule.carId}</span></h3>
                        <p>Name: <span>{schedule.name}</span></p>
                        <p>Date: <span>{schedule.date}</span> Time: <span>{schedule.time}</span></p>
                    </div>
                    <div className='ctr-schedule-option'>
                        <button onClick={openEmailBuyerPopup}>Email Buyer</button>
                        <button onClick={openAddRWCPopup}>Add RWC</button>
                        <button onClick={openCancelPopup}>Cancel booking</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SellerSchedule;
