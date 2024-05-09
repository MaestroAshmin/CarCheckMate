import React, { useState, useEffect } from 'react';
import '../styles/main.css';
import '../styles/content.css';
import '../styles/admin.css';
import HeaderNav from '../../components/scripts/HeaderNav';

export default function AdminPage() {
  const [users, setUsers] = useState(0);
  const [listings, setListings] = useState(0);
  const [inspections, setInspections] = useState(0);

  // Fetch data from your API or data source
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user count
      const usersResponse = await fetch('/api/users/count');
      const usersCount = await usersResponse.json();
      setUsers(usersCount);

      // Fetch listing count
      const listingsResponse = await fetch('/api/listings/count');
      const listingsCount = await listingsResponse.json();
      setListings(listingsCount);

      // Fetch inspection count
      const inspectionsResponse = await fetch('/api/inspections/count');
      const inspectionsCount = await inspectionsResponse.json();
      setInspections(inspectionsCount);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="ctr-main">
      <div className="ctr-sub-content">
        <HeaderNav />
        <div className="admin-page">
          <div className="sidebar">
            <ul>
              <li>
                <a href="/AdminPage">Dashboard</a>
              </li>
              <li>
                <a href="/admin/usersManagement">User Management</a>
              </li>
              <li>
                <a href="/admin/listingsManagement">Listing Management</a>
              </li>
              <li>
                <a href="/admin/inspectionsManagement">Inspection Management</a>
              </li>
            </ul>
          </div>
          <div className="content">
            <h2>Dashboard</h2>
            <div className="stats-container">
                <a href="/admin/userManagement" className="stat-card blue">
                <h3>Users</h3>
                <p>{users}</p>
              </a>
              <a href="/admin/listingManagement" className="stat-card green">
                <h3>Listings</h3>
                <p>{listings}</p>
              </a>
              <a href="/admin/inspectionManagement" className="stat-card red">
                <h3>Inspections</h3>
                <p>{inspections}</p>
              </a>
            </div>
            {/* Add additional content or components here */}
          </div>
        </div>
      </div>
    </div>
  );
}