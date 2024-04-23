import React, { useState } from 'react';
import '../styles/MechanicsListingPage.css';
import Navbar from '../../components/scripts/navbar';
import Footer from '../../components/scripts/footer';
export default function MechanicsListingPage() {

    const [data, setData] = useState([
        {
          "id": 1,
          "name": "Alice Smith",
          "DriversLicenseNumber": "NSW12345678",
          "DateofCommencement": "2023-07-15",
          "PhoneNumber": "+61 412 345 678"
        },
        {
          "id": 2,
          "name": "Bob Johnson",
          "DriversLicenseNumber": "VIC87654321",
          "DateofCommencement": "2022-11-30",
          "PhoneNumber": "+61 423 456 789"
        },
        {
          "id": 3,
          "name": "Charlie Brown",
          "DriversLicenseNumber": "QLD23456789",
          "DateofCommencement": "2024-01-05",
          "PhoneNumber": "+61 432 567 890"
        },
        {
          "id": 4,
          "name": "David Wilson",
          "DriversLicenseNumber": "WA34567890",
          "DateofCommencement": "2023-09-20",
          "PhoneNumber": "+61 432 678 901"
        },
        {
          "id": 5,
          "name": "Emma Davis",
          "DriversLicenseNumber": "SA45678901",
          "DateofCommencement": "2022-06-10",
          "PhoneNumber": "+61 412 789 012"
        },
        {
          "id": 6,
          "name": "Frank Miller",
          "DriversLicenseNumber": "TAS56789012",
          "DateofCommencement": "2023-03-25",
          "PhoneNumber": "+61 423 890 123"
        },
        {
          "id": 7,
          "name": "Grace Wilson",
          "DriversLicenseNumber": "NT67890123",
          "DateofCommencement": "2022-12-03",
          "PhoneNumber": "+61 432 901 234"
        },
        {
          "id": 8,
          "name": "Henry Lee",
          "DriversLicenseNumber": "ACT78901234",
          "DateofCommencement": "2023-08-18",
          "PhoneNumber": "+61 412 012 345"
        },
        {
          "id": 9,
          "name": "Ivy Turner",
          "DriversLicenseNumber": "NSW89012345",
          "DateofCommencement": "2022-10-29",
          "PhoneNumber": "+61 423 123 456"
        },
        {
          "id": 10,
          "name": "Jack Harris",
          "DriversLicenseNumber": "VIC90123456",
          "DateofCommencement": "2023-05-07",
          "PhoneNumber": "+61 432 234 567"
        },
        {
          "id": 11,
          "name": "Katie Brown",
          "DriversLicenseNumber": "QLD01234567",
          "DateofCommencement": "2022-07-12",
          "PhoneNumber": "+61 412 345 678"
        },
        {
          "id": 12,
          "name": "Liam Martin",
          "DriversLicenseNumber": "WA12345678",
          "DateofCommencement": "2023-02-09",
          "PhoneNumber": "+61 423 456 789"
        },
        {
          "id": 13,
          "name": "Mia Clark",
          "DriversLicenseNumber": "SA23456789",
          "DateofCommencement": "2024-04-01",
          "PhoneNumber": "+61 432 567 890"
        },
        {
          "id": 14,
          "name": "Noah Walker",
          "DriversLicenseNumber": "TAS34567890",
          "DateofCommencement": "2023-10-14",
          "PhoneNumber": "+61 432 678 901"
        },
        {
          "id": 15,
          "name": "Olivia Taylor",
          "DriversLicenseNumber": "NT45678901",
          "DateofCommencement": "2022-08-27",
          "PhoneNumber": "+61 412 789 012"
        },
        {
          "id": 16,
          "name": "Peter Harris",
          "DriversLicenseNumber": "ACT56789012",
          "DateofCommencement": "2023-04-03",
          "PhoneNumber": "+61 423 890 123"
        },
        {
          "id": 17,
          "name": "Quinn Turner",
          "DriversLicenseNumber": "NSW67890123",
          "DateofCommencement": "2022-11-22",
          "PhoneNumber": "+61 432 901 234"
        },
        {
          "id": 18,
          "name": "Rose White",
          "DriversLicenseNumber": "VIC78901234",
          "DateofCommencement": "2023-06-16",
          "PhoneNumber": "+61 412 012 345"
        },
        {
          "id": 19,
          "name": "Samuel Clark",
          "DriversLicenseNumber": "QLD89012345",
          "DateofCommencement": "2022-09-01",
          "PhoneNumber": "+61 432 123 456"
        },
        {
          "id": 20,
          "name": "Tiffany Brown",
          "DriversLicenseNumber": "WA90123456",
          "DateofCommencement": "2023-03-08",
          "PhoneNumber": "+61 423 234 567"
        }
      ]
      );  

      const [currentPage, setCurrentPage] = useState(1);
      const [postPerPage, setPostPerPage] = useState(3);

      
      const renderData = () => {
        return currentPosts.map(item => {
          return (
            <li key={item.id}>
            <div className='mechanic'>
            <div className='mechanic-i'>
                <p className='ps'><strong>Name:</strong> {item.name}</p>
                <p className='ps'><strong>Driver's License:</strong> {item.DriversLicenseNumber}</p>
                <p className='ps'><strong>Date of Commencement:</strong> {item.DateofCommencement}</p>
                <p className='ps'><strong>Phone Number:</strong> {item.PhoneNumber}</p>
              </div>
              <button class="button-13" role="button">Request Inspection</button>
            </div>
            
            </li>
          );
        });
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
        <h2>Book a Mechanic</h2>
        <ul className='mechanics-list'>
          {renderData()} {/* Call the renderData function to render the JSX elements */}
        </ul>
        </div>
        <div className='pagination-container'>{Pagination()}</div>
        <Footer/>
      </div>
    )
}