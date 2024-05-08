import { useState } from 'react';
import MechanicSchedule from './MechanicSchedule';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AvailableRequestsPopup from './AvailableRequestsPopup';

function UserContentMechanic() {
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
    const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [showAvailableRequestsPopup, setShowAvailableRequestsPopup] = useState(false);

    const openAvailableRequestsPopup = () => {
        setShowAvailableRequestsPopup(true);
    };

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
                {currentReports.map((report, index) => (
                    <div key={index} className='ctr-user-content-right-report'>
                        <Link to={report.link}><img src={report.img} /></Link>
                        <span>{report.id}</span>&nbsp;-&nbsp;
                        <span>{report.date}</span>
                        <br />
                        <Link to={report.link}>View Details</Link>
                    </div>
                ))}
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

