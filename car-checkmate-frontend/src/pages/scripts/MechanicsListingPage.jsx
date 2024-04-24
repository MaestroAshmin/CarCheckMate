import React, { useState, useEffect } from 'react';
import '../styles/MechanicsListingPage.css';
import Navbar from '../../components/scripts/navbar';
import Footer from '../../components/scripts/footer';
import mechanicsData from './mechanicsData.json';
import { useNavigate } from 'react-router-dom';
export default function MechanicsListingPage() {

    const [data, setData] = useState([]);  
    const navigate = useNavigate();
    useEffect(() => {
        setData(mechanicsData);
    }, []);

      const [currentPage, setCurrentPage] = useState(1);
      const [postPerPage, setPostPerPage] = useState(3);

      
      const renderData = () => {
        return currentPosts.map(item => {
          return (
            <li key={item.id}>
            <div className='mechanic'>
            <div className='mechanic-i'>
                <p className='ps'>{item.name}</p>
                {/* <p className='ps'><strong>Driver's License:</strong> {item.DriversLicenseNumber}</p>
                <p className='ps'><strong>Date of Commencement:</strong> {item.DateofCommencement}</p>
                <p className='ps'><strong>Phone Number:</strong> {item.PhoneNumber}</p> */}
              </div>
              <button class="button-13" role="button" onClick={() => handleInspectionClick(item.id)}>Request For Inspection</button>
            </div>
            
            </li>
          );
        });
      };
      const handleInspectionClick = (itemId) => {
        navigate(`/MechanicPage/${itemId}`);
      };
        const lastPostIndex = currentPage * postPerPage;
        const firstPostIndex = lastPostIndex - postPerPage;
        const currentPosts = data.slice(firstPostIndex,lastPostIndex)

        const Pagination = () => {
            let pages = [];

            for(let i = 1; i<=Math.ceil(data.length/postPerPage); i++){
                pages.push(i)
            }
            return(
                <div className='pagination'>
                    {pages.map((page, index)=>{
                        return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? 'active' : ''}>{page}</button>;
                    })}
                </div>
            )
        }




      
    
    return(
        <div className='mechanic-list-container'>
        <Navbar />
        <div className='mechanic--data'>
        <h2 className='hs'>Book a Mechanic</h2>
        
        <ul className='mechanics-list'>
          {renderData()} {/* Call the renderData function to render the JSX elements */}
        </ul>
        </div>
        <div className='pagination-container'>{Pagination()}</div>
        <Footer/>
      </div>
    )
}