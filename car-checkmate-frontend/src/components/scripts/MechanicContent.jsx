import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MechanicSchedule from './MechanicSchedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AvailableRequestsPopup from './AvailableRequestsPopup';

function UserContentMechanic() {
    const [inspectedData,setInspectedData] = useState([])
    console.log(inspectedData)
    const [reports, setReports] = useState([
        { img: 'images/car-01.jpg', id: 'RP22232', link: '/report/RP22232', date: '24/04/2024' },
        { img: 'images/car-02.jpg', id: 'RP34567', link: '/report/RP34567', date: '26/04/2024' },
        { img: 'images/car-03.jpg', id: 'RP22232', link: '/report/RP22232', date: '20/04/2024' },
        { img: 'images/car-04.jpg', id: 'RP34567', link: '/report/RP34567', date: '13/04/2024' },
        { img: 'images/car-05.jpg', id: 'RP22232', link: '/report/RP22232', date: '11/04/2024' },
        { img: 'images/car-06.jpg', id: 'RP34567', link: '/report/RP34567', date: '24/04/2024' },
        { img: 'images/car-07.jpg', id: 'RP22232', link: '/report/RP22232', date: '24/04/2024' },
        { img: 'images/car-08.jpg', id: 'RP34567', link: '/report/RP34567', date: '26/04/2024' },
        { img: 'images/car-09.jpg', id: 'RP22232', link: '/report/RP22232', date: '20/04/2024' },
        { img: 'images/car-10.jpg', id: 'RP34567', link: '/report/RP34567', date: '13/04/2024' },
        { img: 'images/car-11.jpg', id: 'RP22232', link: '/report/RP22232', date: '11/04/2024' },
        { img: 'images/car-12.jpg', id: 'RP34567', link: '/report/RP34567', date: '24/04/2024' },
        // Add more reports as needed
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 5;

    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = inspectedData.slice(indexOfFirstReport, indexOfLastReport);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showAvailableRequestsPopup, setShowAvailableRequestsPopup] = useState(false);

    const openAvailableRequestsPopup = () => {
        setShowAvailableRequestsPopup(true);
    };

    const getAllForms = async () => {
        try {
            const response = await axios.get('http://localhost:3000/inspections/inspected-form');
            setInspectedData(response.data);
        } catch (error) {
            console.error('Error fetching all forms:', error);
            throw error;
        }
    };
    
    useEffect(() => {
        // Fetch data initially when the component mounts
        getAllForms();
    
        // Fetch data periodically every 5 seconds (adjust as needed)
        const intervalId = setInterval(() => {
            getAllForms();
        }, 5000); // 5000 milliseconds = 5 seconds
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    const navigate = useNavigate();
    function handleClick(id) {
        navigate(`/InspectedReport/${id}`);
    }
    return (
        <div className='ctr-user-content'>

            <AvailableRequestsPopup
                showAvailableRequestsPopup={showAvailableRequestsPopup}
                setShowAvailableRequestsPopup={setShowAvailableRequestsPopup}
            />

            <div className='ctr-user-content-left'>
                <h3>Upcoming Schedule</h3>
                <button className='ctr-user-button' onClick={openAvailableRequestsPopup}>View Available Inspection Requests</button>
                <MechanicSchedule />
            </div>
            <div className='ctr-user-content-right'>
                <h3>View Reports History</h3>
                <br />
                {inspectedData.map((report, index) => (
                    <div key={index} className='ctr-user-content-right-report'>
                        <Link to={report.link}><img src={report.carId.carPhotos[1]} /></Link>
                        <h6>Car</h6>&nbsp;-&nbsp;
                        <span>{report.carId.make}</span>
                        <span>{report.carId.model}</span>
                        <h6>Address</h6>
                        <span>{report.carId.streetName}</span>
                        <span>{report.carId.suburb}</span>
                        <span>{report.carId.state}</span>
                        <span>{report.carId.postcode}</span>
                        <br />
                        <button onClick={() => handleClick(report._id)}>View Details</button>
                    </div>
                ))}
                <br />
                <div className="pagination">
                    {Array.from({ length: Math.ceil(reports.length / reportsPerPage) }, (_, index) => (
                        <button key={index} onClick={() => paginate(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            </div>
       </div>
    );
}

export default UserContentMechanic;

