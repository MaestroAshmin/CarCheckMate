import React, { useState, useEffect } from 'react';
import '../styles/MechanicsListingPage.css';
import Navbar from '../../components/scripts/navbar';
import Footer from '../../components/scripts/footer';
import CarData from './CarData.json';
import { useNavigate } from 'react-router-dom';

export default function MechanicsListingPage() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
        setData(CarData.map(item => ({ ...item, status: 'pending' }))); // Add status field to each item
    }, []);

    const handleAccept = (itemId) => {
        setData(data.map(item => {
            if (item.id === itemId) {
                return { ...item, status: 'accepted' };
            }
            return item;
        }));
    };

    const handleDeny = (itemId) => {
        setData(data.map(item => {
            if (item.id === itemId) {
                return { ...item, status: 'denied' };
            }
            return item;
        }));
    };

    const renderData = () => {
      return currentPosts.map(item => (
          <li key={item.id}>
              <div className='mechanic'>
                  <div className='mechanic-i'>
                      <div className='mms'>
                          <p className='ps'><strong>{item.make}</strong>,</p>
                          <p className='ps'><strong>{item.model}</strong> </p>
                      </div>
                      <div className='sss'>
                          <p className='ps'> {item.suburb},</p>
                          <p className='ps'> {item.state}</p>
                      </div>
                  </div>
                  <div className='accept-deny-container'>
                      {  item.status === 'pending' && (
                          <>
                              <button className="button-13" onClick={() => handleAccept(item.id)}>Accept</button>
                              <button className="button-13" onClick={() => handleDeny(item.id)}>Deny</button>
                          </>
                      )}
                      {item.status !== 'pending' && (
                          <p className={`ps ${item.status === 'accepted' ? 'accepted-status' : item.status === 'denied' ? 'denied-status' : ''}`}>Status: {item.status}</p>
                      )}
                  </div>
              </div>
          </li>
      ));
  };
  
  

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = data.slice(firstPostIndex, lastPostIndex);

    const Pagination = () => {
        let pages = [];

        for (let i = 1; i <= Math.ceil(data.length / postPerPage); i++) {
            pages.push(i);
        }
        return (
            <div className='pagination'>
                {pages.map((page, index) => (
                    <button key={index} onClick={() => setCurrentPage(page)} className={page === currentPage ? 'active' : ''}>{page}</button>
                ))}
            </div>
        );
    };

    return (
        <div className='mechanic-list-container'>
            <Navbar />
            <div className='mechanic--data'>
                <h2 className='hs'>Booked Inspections</h2>
                <ul className='mechanics-list'>
                    {renderData()}
                </ul>
            </div>
            <div className='pagination-container'>{Pagination()}</div>
            <Footer />
        </div>
    );
}
