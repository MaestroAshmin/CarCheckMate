import React, { useState, useEffect } from "react";
import "../styles/main.css";
import "../styles/content.css";
import "../styles/admin.css";
import HeaderNav from "../../components/scripts/HeaderNav";
import AdminSellerManagement from "../../components/scripts/AdminSellerManagement";
import AdminListingManagement from "../../components/scripts/AdminListingManagement";
import AdminInspectionManagement from "../../components/scripts/AdminInspectionManagement";
import AdminPendingSellerVerification from "../../components/scripts/AdminPendingSellerVerification";
import AdminPendingMechanicVerification from "../../components/scripts/AdminPendingMechanicVerifications";

export default function AdminPage() {
  const [users, setUsers] = useState(0);
  const [listings, setListings] = useState(0);
  const [inspections, setInspections] = useState(0);
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Fetch data from your API or data source
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch user count
      const usersResponse = await fetch("/api/users/count");
      const usersCount = await usersResponse.json();
      setUsers(usersCount);

      // Fetch listing count
      const listingsResponse = await fetch("/api/listings/count");
      const listingsCount = await listingsResponse.json();
      setListings(listingsCount);

      // Fetch inspection count
      const inspectionsResponse = await fetch("/api/inspections/count");
      const inspectionsCount = await inspectionsResponse.json();
      setInspections(inspectionsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "users":
        return <AdminSellerManagement />;
      case "listings":
        return <AdminListingManagement />;
      case "inspections":
        return <AdminInspectionManagement />;
      case "pending-seller-verifications":
        return <AdminPendingSellerVerification/>;
      case "pending-mechanic-verifications":
        return <AdminPendingMechanicVerification/>;
      default:
        return (
          <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="stats-container">
              <a
                href="#"
                onClick={() => handleComponentChange("users")}
                className="stat-card blue"
              >
                <h3>Users</h3>
                <p>{users}</p>
              </a>
              <a
                href="#"
                onClick={() => handleComponentChange("listings")}
                className="stat-card green"
              >
                <h3>Listings</h3>
                <p>{listings}</p>
              </a>
              <a
                href="#"
                onClick={() => handleComponentChange("inspections")}
                className="stat-card red"
              >
                <h3>Inspections</h3>
                <p>{inspections}</p>
              </a>
              <a
                href="#"
                onClick={() => handleComponentChange("pending-seller-verfications")}
                className="stat-card red"
              >
                <h3>Pending Seller Verifications</h3>
                {/* <p>{inspections}</p> */}
              </a>
              <a
                href="#"
                onClick={() => handleComponentChange("pending-mechanic-verfications")}
                className="stat-card red"
              >
                <h3>Pending Mechanic Verifications</h3>
                {/* <p>{inspections}</p> */}
              </a>
            </div>
          </div>
        );
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
                <a href="#" onClick={() => handleComponentChange("dashboard")}>
                  Dashboard
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleComponentChange("users")}>
                  Seller Management
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleComponentChange("listings")}>
                  Listing Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleComponentChange("inspections")}
                >
                  Inspection Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleComponentChange("pending-seller-verifications")}
                >
                  Seller Verifications Management
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => handleComponentChange("pending-mechanic-verifications")}
                >
                  Mechanic Verifications Management
                </a>
              </li>
            </ul>
          </div>
          <div className="content">
            <div>{renderComponent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
